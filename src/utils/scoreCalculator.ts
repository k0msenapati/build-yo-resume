import { Resume } from './resumeParser';

export interface FeedbackItem {
  type: 'pass' | 'warn' | 'fail';
  message: string;
}

export interface ScoreResult {
  score: number;
  feedback: FeedbackItem[];
}

/**
 * Calculates a resume score and provides detailed feedback.
 * @param {Resume | null} data - The parsed resume object.
 * @returns {ScoreResult} Score and feedback items.
 */
export function calculateScore(data: Resume | null): ScoreResult {
  if (!data) {
    return {
      score: 0,
      feedback: [{ type: 'fail', message: 'No data to parse. Please input valid JSON.' }],
    };
  }

  let score = 0;
  const feedback: FeedbackItem[] = [];

  // 1. Basics Check (Max 25 pts)
  const basics = data.basics || {};

  if (basics.name && basics.name.trim().length > 0) {
    score += 8;
    feedback.push({ type: 'pass', message: 'Full name is present.' });
  } else {
    feedback.push({ type: 'fail', message: 'Missing full name at basics.name.' });
  }

  if (basics.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(basics.email.trim())) {
    score += 7;
    feedback.push({ type: 'pass', message: 'Valid email address is present.' });
  } else {
    feedback.push({ type: 'fail', message: 'Missing or invalid email address at basics.email.' });
  }

  if (basics.phone && basics.phone.trim().length > 0) {
    score += 3;
    feedback.push({ type: 'pass', message: 'Phone number is present.' });
  } else {
    feedback.push({
      type: 'warn',
      message: 'Missing phone number. Recruiters need a way to contact you directly.',
    });
  }

  if (basics.location && (basics.location.city || basics.location.region)) {
    score += 3;
    feedback.push({ type: 'pass', message: 'Location (city/region) is specified.' });
  } else {
    feedback.push({
      type: 'warn',
      message: 'Missing location details. Many filters search by location/radius.',
    });
  }

  // Links check (LinkedIn, GitHub, Leetcode, Website/Portfolio)
  const linkCount =
    (basics.linkedin ? 1 : 0) +
    (basics.github ? 1 : 0) +
    (basics.leetcode ? 1 : 0) +
    (basics.website ? 1 : 0) +
    (basics.portfolio ? 1 : 0);
  if (linkCount >= 2) {
    score += 4;
    feedback.push({
      type: 'pass',
      message: `Great! Found ${linkCount} professional profile links (LinkedIn, GitHub, or Portfolio).`,
    });
  } else if (linkCount > 0) {
    score += 2;
    feedback.push({
      type: 'warn',
      message:
        'Only 1 professional link found. Include LinkedIn, GitHub, and Portfolio for recruiters.',
    });
  } else {
    feedback.push({
      type: 'fail',
      message: 'No professional profile links (LinkedIn, GitHub, Portfolio) found.',
    });
  }

  // 2. Education Section Check (Max 20 pts)
  const education = data.education || [];
  if (Array.isArray(education) && education.length > 0) {
    score += 12;
    feedback.push({
      type: 'pass',
      message: `Education section is present with ${education.length} degree(s).`,
    });

    let hasDegrees = true;
    let hasCoursesOrHighlights = false;
    education.forEach((e) => {
      if (!e.institution || !e.studyType || !e.area) {
        hasDegrees = false;
      }
      if (e.highlights && e.highlights.length > 0) {
        hasCoursesOrHighlights = true;
      }
    });

    if (hasDegrees) {
      score += 5;
      feedback.push({
        type: 'pass',
        message: 'Education entries contain institution, degree type, and field of study.',
      });
    } else {
      feedback.push({
        type: 'warn',
        message: 'Some education entries are missing institution, degree, or major details.',
      });
    }

    if (hasCoursesOrHighlights) {
      score += 3;
      feedback.push({
        type: 'pass',
        message: 'Education highlights (coursework, GPA, or TA roles) included.',
      });
    } else {
      feedback.push({
        type: 'warn',
        message:
          'Consider adding GPA or coursework highlights under education to show academic depth.',
      });
    }
  } else {
    feedback.push({
      type: 'fail',
      message:
        'Education section is missing or empty. This is essential for students and graduates.',
    });
  }

  // 3. Work Experience Check (Max 25 pts)
  const work = data.work || [];
  if (Array.isArray(work) && work.length > 0) {
    score += 10;
    feedback.push({
      type: 'pass',
      message: `Work experience section present with ${work.length} position(s).`,
    });

    let totalHighlights = 0;
    let missingDates = false;
    let missingRoles = false;

    work.forEach((w) => {
      if (Array.isArray(w.highlights)) {
        totalHighlights += w.highlights.length;
      }
      if (!w.startDate || !w.endDate) {
        missingDates = true;
      }
      if (!w.position || !w.name) {
        missingRoles = true;
      }
    });

    if (totalHighlights >= 3) {
      score += 10;
      feedback.push({
        type: 'pass',
        message: `Excellent! Found ${totalHighlights} bullet points. Accomplishments are best listed as bullets.`,
      });
    } else if (totalHighlights > 0) {
      score += 5;
      feedback.push({
        type: 'warn',
        message: `Only ${totalHighlights} bullet points found. Add more specific accomplishment statements.`,
      });
    } else {
      feedback.push({
        type: 'fail',
        message: 'No accomplishment bullet points found in work experience.',
      });
    }

    if (!missingDates) {
      score += 5;
      feedback.push({
        type: 'pass',
        message: 'All work experience entries have start and end dates.',
      });
    } else {
      feedback.push({
        type: 'fail',
        message:
          'Some work experience entries are missing dates. Scoring needs dates to calculate duration.',
      });
    }

    if (missingRoles) {
      feedback.push({
        type: 'fail',
        message: 'Some work entries are missing company name or job title.',
      });
    }
  } else {
    feedback.push({
      type: 'warn',
      message:
        'Work experience section is missing or empty. (Optional for pure academic CVs, but highly recommended for software jobs).',
    });
  }

  // 4. Skills Section Check (Max 20 pts)
  const skills = data.skills || [];
  if (Array.isArray(skills) && skills.length > 0) {
    score += 10;
    feedback.push({ type: 'pass', message: 'Skills section is present.' });

    let keywordCount = 0;
    skills.forEach((s) => {
      if (Array.isArray(s.keywords)) {
        keywordCount += s.keywords.length;
      }
    });

    if (keywordCount >= 8) {
      score += 10;
      feedback.push({
        type: 'pass',
        message: `Great technical keyword density! Found ${keywordCount} skills.`,
      });
    } else if (keywordCount >= 4) {
      score += 6;
      feedback.push({
        type: 'warn',
        message: `Only ${keywordCount} skill keywords found. List more specific technologies and developer tools.`,
      });
    } else {
      feedback.push({
        type: 'fail',
        message: `Very few skill keywords (${keywordCount}) found. Add technical and domain keywords.`,
      });
    }
  } else {
    feedback.push({
      type: 'fail',
      message:
        'Skills section is missing or empty. The parser relies heavily on this for keyword matching.',
    });
  }

  // 5. Projects Section Check (Max 10 pts)
  const projects = data.projects || [];
  if (Array.isArray(projects) && projects.length > 0) {
    score += 10;
    feedback.push({
      type: 'pass',
      message: `Projects section is present with ${projects.length} project(s).`,
    });
  } else {
    feedback.push({
      type: 'warn',
      message:
        'Consider adding a Projects section to highlight open-source work or academic engineering projects.',
    });
  }

  // 6. Achievements & Certifications (Extra credentials, max 8 pts)
  const achievements = data.achievements || [];
  if (Array.isArray(achievements) && achievements.length > 0) {
    score += 4;
    feedback.push({
      type: 'pass',
      message: `Achievements section is present with ${achievements.length} entry/entries.`,
    });
  }

  const certifications = data.certifications || [];
  if (Array.isArray(certifications) && certifications.length > 0) {
    score += 4;
    feedback.push({
      type: 'pass',
      message: `Certifications section is present with ${certifications.length} entry/entries.`,
    });
  }

  return {
    score: Math.min(100, score),
    feedback: feedback.sort((a, b) => {
      const typeWeight = { fail: 0, warn: 1, pass: 2 };
      return typeWeight[a.type] - typeWeight[b.type]; // Show warnings and failures first
    }),
  };
}
