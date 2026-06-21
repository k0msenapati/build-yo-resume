import { z } from 'zod';

// -------------------------------------------------------------
// Zod Validation Schema definitions for the Resume Object
// -------------------------------------------------------------

export const LocationSchema = z
  .object({
    city: z.string().optional().or(z.literal('')),
    region: z.string().optional().or(z.literal('')),
  })
  .optional()
  .or(z.null());

export const BasicsSchema = z
  .object({
    name: z.string().optional().or(z.literal('')),
    label: z.string().optional().or(z.literal('')),
    email: z.string().optional().or(z.literal('')),
    phone: z.string().optional().or(z.literal('')),
    location: LocationSchema,
    linkedin: z.string().optional().or(z.literal('')),
    github: z.string().optional().or(z.literal('')),
    leetcode: z.string().optional().or(z.literal('')),
    website: z.string().optional().or(z.literal('')),
    portfolio: z.string().optional().or(z.literal('')),
    summary: z.string().optional().or(z.literal('')),
  })
  .optional()
  .or(z.null());

export const EducationItemSchema = z.object({
  institution: z.string().optional().or(z.literal('')),
  area: z.string().optional().or(z.literal('')),
  studyType: z.string().optional().or(z.literal('')),
  startDate: z.string().optional().or(z.literal('')),
  endDate: z.string().optional().or(z.literal('')),
  // Can be GPA, CGPA, percentage, etc. (e.g. "Percentage: 98%", "CGPA: 8.67", or "3.92 GPA")
  score: z.string().optional().or(z.literal('')),
  location: z.string().optional().or(z.literal('')),
  highlights: z.array(z.string()).optional(),
});

export const WorkItemSchema = z.object({
  name: z.string().optional().or(z.literal('')),
  position: z.string().optional().or(z.literal('')),
  startDate: z.string().optional().or(z.literal('')),
  endDate: z.string().optional().or(z.literal('')),
  summary: z.string().optional().or(z.literal('')),
  location: z.string().optional().or(z.literal('')),
  highlights: z.array(z.string()).optional(),
});

export const ProjectItemSchema = z.object({
  name: z.string().optional().or(z.literal('')),
  description: z.string().optional().or(z.literal('')),
  github: z.string().optional().or(z.literal('')),
  live: z.string().optional().or(z.literal('')),
  startDate: z.string().optional().or(z.literal('')),
  endDate: z.string().optional().or(z.literal('')),
  highlights: z.array(z.string()).optional(),
});

export const SkillItemSchema = z.object({
  name: z.string().optional().or(z.literal('')),
  keywords: z.array(z.string()).optional(),
});

export const CertificationItemSchema = z.object({
  name: z.string().optional().or(z.literal('')),
  issuer: z.string().optional().or(z.literal('')),
  date: z.string().optional().or(z.literal('')),
});

export const ResumeSchema = z
  .object({
    basics: BasicsSchema,
    education: z.array(EducationItemSchema).optional(),
    work: z.array(WorkItemSchema).optional(),
    projects: z.array(ProjectItemSchema).optional(),
    skills: z.array(SkillItemSchema).optional(),
    achievements: z.array(z.string()).optional(),
    certifications: z.array(CertificationItemSchema).optional(),
  })
  .passthrough();

export type Resume = z.infer<typeof ResumeSchema>;
export type EducationItem = z.infer<typeof EducationItemSchema>;
export type WorkItem = z.infer<typeof WorkItemSchema>;
export type ProjectItem = z.infer<typeof ProjectItemSchema>;
export type SkillItem = z.infer<typeof SkillItemSchema>;
export type CertificationItem = z.infer<typeof CertificationItemSchema>;

/**
 * Parses and validates the resume JSON string using Zod.
 * @param {string} jsonString - The JSON string representing the resume.
 * @returns {{ data: Resume | null, error: string | null }} Parsed resume object or error message.
 */
export function parseResumeJson(jsonString: string): { data: Resume | null; error: string | null } {
  if (!jsonString || jsonString.trim() === '') {
    return { data: null, error: 'JSON content is empty.' };
  }

  try {
    const data = JSON.parse(jsonString);

    // Perform basic structural validation
    if (typeof data !== 'object' || data === null) {
      return { data: null, error: 'Resume JSON must be an object at the root level.' };
    }

    if (Array.isArray(data)) {
      return { data: null, error: 'Resume JSON must be an object, not an array.' };
    }

    // Run Zod schema parser
    const parsed = ResumeSchema.safeParse(data);
    if (!parsed.success) {
      const errorDetails = parsed.error.issues
        .map((issue) => {
          const path = issue.path.join('.');
          return `${path ? `[${path}] ` : ''}${issue.message}`;
        })
        .join('; ');
      return { data: null, error: `JSON Schema violation: ${errorDetails}` };
    }

    return { data: parsed.data as Resume, error: null };
  } catch (err: any) {
    return { data: null, error: `Invalid JSON syntax: ${err.message}` };
  }
}

/**
 * Returns the default starter resume template.
 */
export function getDefaultResumeTemplate(): Resume {
  return {
    basics: {
      name: 'Alex Rivera',
      label: 'Software Engineering Graduate',
      email: 'alex.rivera@email.com',
      phone: '+1 (555) 382-9102',
      location: {
        city: 'Seattle',
        region: 'WA',
      },
      linkedin: 'linkedin.com/in/alex-rivera',
      github: 'github.com/alexrivera',
      leetcode: 'leetcode.com/u/alexrivera',
      website: 'alexrivera.dev',
      summary:
        'High-achieving Computer Science graduate with internship experience at Meta and a strong foundation in building scalable distributed systems. Proficient in React, Node.js, and cloud deployments. Passionate about low-latency performance optimization and system automation.',
    },
    education: [
      {
        institution: 'University of Washington',
        area: 'Computer Science & Engineering',
        studyType: 'Bachelor of Science',
        startDate: '2022-09',
        endDate: '2026-06',
        score: 'GPA: 3.92',
        highlights: [
          'Relevant Coursework: Data Structures & Algorithms, Systems Programming, Database Systems, Web Development',
          'Teaching Assistant for CSE 373 (Data Structures & Algorithms), guiding 30+ students in weekly sessions',
          "Dean's List: All Quarters",
        ],
      },
    ],
    work: [
      {
        name: 'Meta',
        position: 'Software Engineering Intern',
        startDate: '2025-06',
        endDate: '2025-09',
        summary: 'Worked within the Instagram Reels Core Performance organization.',
        highlights: [
          'Optimized client-side video rendering cache in React Native, reducing playback lag by 14% on low-end devices.',
          'Collaborated with cross-functional product and infrastructure teams to design and run an A/B test with 5M+ active users.',
          'Refactored legacy video pre-fetching APIs using Hack/PHP, reducing network query response latency by 45ms.',
        ],
      },
      {
        name: 'UW Information School',
        position: 'Full-Stack Student Developer',
        startDate: '2024-09',
        endDate: '2025-05',
        highlights: [
          'Rebuilt the departmental course planning web tool using Next.js, TypeScript, and Tailwind CSS.',
          'Designed relational PostgreSQL schema and implemented Prisma ORM queries, eliminating redundant database roundtrips.',
          'Integrated Microsoft OAuth for secure login authentication, supporting 1,200+ active student and faculty profiles.',
        ],
      },
    ],
    projects: [
      {
        name: 'DevConnect Workspace',
        description:
          'A real-time collaborative development hub with a shared editor, persistent chat, and whiteboard tools.',
        github: 'github.com/alexrivera/devconnect',
        live: 'devconnect.live',
        highlights: [
          'Implemented live text synchronization using Socket.io and Yjs CRDTs to support conflict-free concurrent editing.',
          'Optimized state updates in React, maintaining a smooth 60 FPS frame rate during high-concurrency testing.',
          'Packaged application in Docker containers and deployed to AWS EC2 instances with automated Nginx reverse proxy configuration.',
        ],
      },
      {
        name: 'KernelFS',
        description:
          'A lightweight user-space file system (FUSE) implemented in C to demonstrate memory and file management.',
        github: 'github.com/alexrivera/kernelfs',
        highlights: [
          'Designed customized block allocation tables, directory hierarchies, and basic data caching schemas.',
          'Validated filesystem performance with zero integrity failures across 50+ automated disk simulation scripts.',
        ],
      },
    ],
    skills: [
      {
        name: 'Programming Languages',
        keywords: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C/C++', 'SQL', 'HTML5/CSS3'],
      },
      {
        name: 'Frameworks & Developer Tools',
        keywords: [
          'React.js',
          'Next.js',
          'Node.js',
          'Express',
          'PostgreSQL',
          'Docker',
          'Git',
          'AWS',
          'Linux',
        ],
      },
    ],
    achievements: [
      '1st Place out of 120+ competing teams at UW Hackathon 2025 (engineered a distributed IoT monitoring server)',
      'Top 1% ranking (Max Rating: 2,150) on LeetCode competitive platform among 600,000+ active users',
      'Recipient of the Washington State CS Leaders Scholarship for academic excellence and teaching service',
    ],
    certifications: [
      {
        name: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services',
        date: '2025-11',
      },
      {
        name: 'Certified Kubernetes Administrator (CKA)',
        issuer: 'The Linux Foundation',
        date: '2026-02',
      },
    ],
  };
}
