import React from 'react';
import {
  Resume,
  EducationItem,
  WorkItem,
  ProjectItem,
  SkillItem,
  CertificationItem,
} from '../utils/resumeParser';

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline shrink-0"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline shrink-0"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="11"
    viewBox="0 0 128 128"
    className="inline shrink-0"
  >
    <path
      fill="currentColor"
      d="M116 3H12a8.91 8.91 0 00-9 8.8v104.42a8.91 8.91 0 009 8.78h104a8.93 8.93 0 009-8.81V11.77A8.93 8.93 0 00116 3z"
    />
    <path
      fill="#fff"
      d="M21.06 48.73h18.11V107H21.06zm9.06-29a10.5 10.5 0 11-10.5 10.49 10.5 10.5 0 0110.5-10.49M50.53 48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75v32H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53z"
    />
  </svg>
);

const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="11"
    viewBox="0 0 128 128"
    className="inline shrink-0"
  >
    <g fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"
      />
      <path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0" />
    </g>
  </svg>
);

const LeetcodeIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className="inline shrink-0"
    fill="currentColor"
  >
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
  </svg>
);

const GlobeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="11"
    fill="currentColor"
    className="inline shrink-0"
    viewBox="0 0 16 16"
  >
    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline shrink-0"
  >
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);

export interface ResumePreviewProps {
  resumeData: Resume | null;
  settings: {
    fontFamily: string;
    fontSize: number;
    marginTop: number;
    marginBottom: number;
    marginSide: number;
    sectionGap: number;
    lineHeight: number;
    linkColor: 'blue' | 'black';
    showPageNumbers: boolean;
    showIcons: boolean;
  };
  zoom?: number;
}

const defaultBasics = {
  name: '',
  label: '',
  email: '',
  phone: '',
  location: { city: '', region: '' },
  linkedin: '',
  github: '',
  leetcode: '',
  website: '',
  portfolio: '',
  summary: '',
};

interface BlockItem {
  id: string;
  render: () => React.JSX.Element;
}

export default function ResumePreview({ resumeData, settings, zoom = 1.1 }: ResumePreviewProps) {
  const [pages, setPages] = React.useState<string[][]>([]);
  const measureRef = React.useRef<HTMLDivElement>(null);
  const [fontsLoaded, setFontsLoaded] = React.useState<boolean>(false);

  // Monitor WebFont loading to re-run layout measurements and prevent layout shifts.
  React.useEffect(() => {
    const handleLoadingDone = () => {
      setFontsLoaded((prev) => !prev);
    };

    if (document.fonts) {
      document.fonts.addEventListener('loadingdone', handleLoadingDone);
      // Run once initially
      document.fonts.ready.then(handleLoadingDone);
      return () => {
        document.fonts.removeEventListener('loadingdone', handleLoadingDone);
      };
    } else {
      setFontsLoaded(true);
    }
  }, []);

  // Resolve CSS style variables from settings with fallback options
  const resumeStyle = {
    fontFamily:
      settings.fontFamily === 'Source Sans 3'
        ? "'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        : settings.fontFamily === 'Libre Baskerville'
          ? "'Libre Baskerville', Georgia, serif"
          : settings.fontFamily === 'Arial'
            ? 'Arial, Helvetica, sans-serif'
            : settings.fontFamily === 'Helvetica'
              ? '"Helvetica Neue", Helvetica, Arial, sans-serif'
              : settings.fontFamily === 'Calibri'
                ? 'Calibri, Candara, Segoe, sans-serif'
                : settings.fontFamily === 'Verdana'
                  ? 'Verdana, Geneva, sans-serif'
                  : settings.fontFamily === 'Georgia'
                    ? 'Georgia, serif'
                    : settings.fontFamily === 'Garamond'
                      ? 'Garamond, "EB Garamond", Georgia, serif'
                      : settings.fontFamily === 'Times New Roman'
                        ? '"Times New Roman", Times, serif'
                        : 'Arial, sans-serif',
    fontSize: `${settings.fontSize}pt`,
    paddingTop: `${settings.marginTop}in`,
    paddingBottom: `${settings.marginBottom}in`,
    paddingLeft: `${settings.marginSide}in`,
    paddingRight: `${settings.marginSide}in`,
    lineHeight: settings.lineHeight || '1.35',
  };

  const activeLinkColor = settings.linkColor === 'blue' ? '#2563eb' : '#000000';

  // Order contact items: phone, email, github, linkedin, leetcode, website
  const contactItems = React.useMemo<React.JSX.Element[]>(() => {
    const items: React.JSX.Element[] = [];
    const basics = resumeData && resumeData.basics ? resumeData.basics : defaultBasics;

    if (basics.phone) {
      items.push(
        <span key="phone" className="inline-flex items-center gap-1.5">
          {settings.showIcons && <PhoneIcon />}
          <span>{basics.phone}</span>
        </span>
      );
    }

    if (basics.email) {
      items.push(
        <a
          key="email"
          href={`mailto:${basics.email}`}
          className="inline-flex items-center gap-1.5 hover:underline"
          style={{ color: activeLinkColor }}
        >
          {settings.showIcons && <MailIcon />}
          <span>{basics.email}</span>
        </a>
      );
    }

    if (basics.github) {
      items.push(
        <a
          key="github"
          href={`https://${basics.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 hover:underline"
          style={{ color: activeLinkColor }}
        >
          {settings.showIcons && <GithubIcon />}
          <span>GitHub</span>
        </a>
      );
    }

    if (basics.linkedin) {
      items.push(
        <a
          key="linkedin"
          href={`https://${basics.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 hover:underline"
          style={{ color: activeLinkColor }}
        >
          {settings.showIcons && <LinkedinIcon />}
          <span>LinkedIn</span>
        </a>
      );
    }

    if (basics.leetcode) {
      items.push(
        <a
          key="leetcode"
          href={`https://${basics.leetcode}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 hover:underline"
          style={{ color: activeLinkColor }}
        >
          {settings.showIcons && <LeetcodeIcon />}
          <span>LeetCode</span>
        </a>
      );
    }

    const websiteUrl = basics.website || basics.portfolio;
    if (websiteUrl) {
      items.push(
        <a
          key="website"
          href={`https://${websiteUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 hover:underline"
          style={{ color: activeLinkColor }}
        >
          {settings.showIcons && <GlobeIcon />}
          <span>Website</span>
        </a>
      );
    }

    return items;
  }, [resumeData, settings.showIcons, activeLinkColor]);

  // -------------------------------------------------------------
  // Define layout blocks for pagination mapping
  // -------------------------------------------------------------
  const blocks = React.useMemo<BlockItem[]>(() => {
    const list: BlockItem[] = [];

    if (resumeData) {
      const basics = resumeData.basics || defaultBasics;
      const education = resumeData.education || [];
      const work = resumeData.work || [];
      const projects = resumeData.projects || [];
      const skills = resumeData.skills || [];
      const achievements = resumeData.achievements || [];
      const certifications = resumeData.certifications || [];
      // 1. Header (basics.name, label, contacts)
      list.push({
        id: 'header',
        render: () => (
          <header className="text-center mb-1">
            {basics.name && (
              <h1 className="text-[20pt] font-bold tracking-tight text-zinc-950 uppercase mb-1 leading-tight">
                {basics.name}
              </h1>
            )}
            {basics.label && (
              <div className="text-[10pt] font-semibold text-zinc-600 tracking-wider uppercase mb-2">
                {basics.label}
              </div>
            )}
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[9.5pt] text-zinc-700 font-sans">
              {contactItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && (
                    <span className="text-zinc-300 font-normal select-none mx-0.5">|</span>
                  )}
                  {item}
                </React.Fragment>
              ))}
            </div>
          </header>
        ),
      });

      // 2. Summary
      if (basics.summary) {
        list.push({
          id: 'summary',
          render: () => (
            <section>
              <h2 className="text-[11.5pt] font-bold border-b-2 border-zinc-950 uppercase pb-0.5 mb-2 tracking-wide text-zinc-955">
                Summary
              </h2>
              <p className="text-zinc-855 text-[9.5pt] leading-relaxed text-justify">
                {basics.summary}
              </p>
            </section>
          ),
        });
      }

      // 3. Education Items
      if (education.length > 0) {
        education.forEach((edu: EducationItem, idx: number) => {
          list.push({
            id: `education-${idx}`,
            render: () => (
              <section>
                {idx === 0 && (
                  <h2 className="text-[11.5pt] font-bold border-b-2 border-zinc-950 uppercase pb-0.5 mb-2 tracking-wide text-zinc-955">
                    Education
                  </h2>
                )}
                <div className="flex flex-col">
                  <div className="flex justify-between font-bold text-zinc-955 text-[10.5pt]">
                    <div>{edu.institution}</div>
                    <div className="font-semibold text-zinc-700">
                      {edu.location ||
                        (basics.location
                          ? `${basics.location?.city || ''}, ${basics.location?.region || ''}`
                          : '')}
                    </div>
                  </div>
                  <div className="flex justify-between text-zinc-850 text-[10pt] italic mt-0.5">
                    <div>
                      {edu.studyType} in {edu.area}
                      {edu.score && (
                        <span className="font-semibold text-zinc-900 not-italic">
                          {' '}
                          ({edu.score})
                        </span>
                      )}
                    </div>
                    <div className="text-zinc-655 not-italic">
                      {edu.startDate && `${edu.startDate} – `}
                      {edu.endDate}
                    </div>
                  </div>
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-zinc-850 text-[9.5pt]">
                      {edu.highlights.map((h: string, hIdx: number) => (
                        <li key={hIdx} className="pl-0.5 text-justify">
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ),
          });
        });
      }

      // 4. Experience (Work) Items
      if (work.length > 0) {
        work.forEach((w: WorkItem, idx: number) => {
          list.push({
            id: `work-${idx}`,
            render: () => (
              <section>
                {idx === 0 && (
                  <h2 className="text-[11.5pt] font-bold border-b-2 border-zinc-955 uppercase pb-0.5 mb-2 tracking-wide text-zinc-950">
                    Experience
                  </h2>
                )}
                <div className="flex flex-col">
                  <div className="flex justify-between font-bold text-zinc-955 text-[10.5pt]">
                    <div>{w.name}</div>
                    <div className="font-semibold text-zinc-700">{w.location || 'Remote'}</div>
                  </div>
                  <div className="flex justify-between text-zinc-850 text-[10pt] italic mt-0.5">
                    <div>{w.position}</div>
                    <div className="text-zinc-655 not-italic">
                      {w.startDate} – {w.endDate || 'Present'}
                    </div>
                  </div>
                  {w.summary && (
                    <p className="text-zinc-700 text-[9.5pt] italic mt-1 text-justify">
                      {w.summary}
                    </p>
                  )}
                  {w.highlights && w.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-zinc-855 text-[9.5pt] leading-relaxed">
                      {w.highlights.map((h: string, hIdx: number) => (
                        <li key={hIdx} className="pl-0.5 text-justify">
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ),
          });
        });
      }

      // 5. Project Items
      if (projects.length > 0) {
        projects.forEach((p: ProjectItem, idx: number) => {
          list.push({
            id: `project-${idx}`,
            render: () => (
              <section>
                {idx === 0 && (
                  <h2 className="text-[11.5pt] font-bold border-b-2 border-zinc-955 uppercase pb-0.5 mb-2 tracking-wide text-zinc-950">
                    Projects
                  </h2>
                )}
                <div className="flex flex-col">
                  <div className="flex justify-between font-bold text-zinc-955 text-[10.5pt]">
                    <div>{p.name}</div>
                    <div className="flex items-center gap-3 text-[9.5pt] font-semibold">
                      {(p.startDate || p.endDate) && (
                        <span className="text-zinc-600 font-normal mr-2">
                          {p.startDate ? `${p.startDate} – ` : ''}
                          {p.endDate || 'Present'}
                        </span>
                      )}
                      {p.github && (
                        <a
                          href={`https://${p.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-0.5 hover:underline"
                          style={{ color: activeLinkColor }}
                        >
                          <GithubIcon />
                          <span>GitHub</span>
                        </a>
                      )}
                      {p.live && (
                        <a
                          href={`https://${p.live}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-0.5 hover:underline"
                          style={{ color: activeLinkColor }}
                        >
                          <ExternalLinkIcon />
                          <span>Live</span>
                        </a>
                      )}
                    </div>
                  </div>
                  {p.description && (
                    <p className="text-zinc-800 text-[9.5pt] mt-0.5 leading-relaxed text-justify">
                      {p.description}
                    </p>
                  )}
                  {p.highlights && p.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-zinc-855 text-[9.5pt] leading-relaxed">
                      {p.highlights.map((h: string, hIdx: number) => (
                        <li key={hIdx} className="pl-0.5 text-justify">
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ),
          });
        });
      }

      // 6. Skills
      if (skills.length > 0) {
        list.push({
          id: 'skills',
          render: () => (
            <section>
              <h2 className="text-[11.5pt] font-bold border-b-2 border-zinc-955 uppercase pb-0.5 mb-2 tracking-wide text-zinc-950">
                Technical Skills
              </h2>
              <div className="flex flex-col gap-1.5 text-[9.5pt] text-zinc-855">
                {skills.map((s: SkillItem, idx: number) => (
                  <div key={idx} className="leading-tight">
                    {s.name && <strong className="text-zinc-950 font-bold">{s.name}: </strong>}
                    <span>{s.keywords && s.keywords.join(', ')}</span>
                  </div>
                ))}
              </div>
            </section>
          ),
        });
      }

      // 7. Certifications
      if (certifications && certifications.length > 0) {
        list.push({
          id: 'certifications',
          render: () => (
            <section>
              <h2 className="text-[11.5pt] font-bold border-b-2 border-zinc-955 uppercase pb-0.5 mb-2 tracking-wide text-zinc-955">
                Certifications
              </h2>
              <div className="flex flex-col gap-1.5 text-[9.5pt] text-zinc-855">
                {certifications.map((cert: CertificationItem, idx: number) => (
                  <div key={idx} className="flex justify-between leading-tight">
                    <div>
                      <strong className="text-zinc-950 font-bold">{cert.name}</strong>
                      {cert.issuer && <span className="text-zinc-700"> – {cert.issuer}</span>}
                    </div>
                    {cert.date && (
                      <div className="text-[9pt] text-zinc-600 font-medium">{cert.date}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ),
        });
      }

      // 8. Achievements
      if (achievements && achievements.length > 0) {
        list.push({
          id: 'achievements',
          render: () => (
            <section>
              <h2 className="text-[11.5pt] font-bold border-b-2 border-zinc-955 uppercase pb-0.5 mb-2 tracking-wide text-zinc-955">
                Achievements
              </h2>
              <ul className="list-disc list-outside ml-4 space-y-0.5 text-zinc-855 text-[9.5pt] leading-relaxed">
                {achievements.map((ach: string, idx: number) => (
                  <li key={idx} className="pl-0.5 text-justify">
                    {ach}
                  </li>
                ))}
              </ul>
            </section>
          ),
        });
      }
    }

    return list;
  }, [resumeData, contactItems, activeLinkColor]);

  // -------------------------------------------------------------
  // Measure block heights and partition into pages
  // -------------------------------------------------------------
  React.useLayoutEffect(() => {
    if (!resumeData || !measureRef.current) return;

    const children = Array.from(measureRef.current.children) as HTMLDivElement[];
    if (children.length === 0) return;

    const blockHeights = children.map((child) => child.getBoundingClientRect().height);

    // standard A4 height is 1122.5px at 96 DPI
    const A4_HEIGHT_PX = 1122.5;
    const marginTopPx = settings.marginTop * 96;
    const marginBottomPx = settings.marginBottom * 96;
    // Add a 24px safety buffer to prevent edge overflows and keep spacing away from footers
    const safetyBufferPx = 24;
    const maxContentHeight = A4_HEIGHT_PX - marginTopPx - marginBottomPx - safetyBufferPx;
    const gap = settings.sectionGap || 10;

    const computedPages: string[][] = [];
    let currentPageBlockIds: string[] = [];
    let currentHeight = 0;

    blocks.forEach((block, index) => {
      const blockHeight = blockHeights[index] || 0;
      const itemHeightWithGap = currentPageBlockIds.length === 0 ? blockHeight : blockHeight + gap;

      if (currentHeight + itemHeightWithGap > maxContentHeight && currentPageBlockIds.length > 0) {
        // Exceeds this page height, start next page
        computedPages.push(currentPageBlockIds);
        currentPageBlockIds = [block.id];
        currentHeight = blockHeight;
      } else {
        currentPageBlockIds.push(block.id);
        currentHeight += itemHeightWithGap;
      }
    });

    if (currentPageBlockIds.length > 0) {
      computedPages.push(currentPageBlockIds);
    }

    setPages(computedPages);
  }, [
    resumeData,
    settings.marginTop,
    settings.marginBottom,
    settings.marginSide,
    settings.sectionGap,
    settings.fontFamily,
    settings.fontSize,
    settings.lineHeight,
    fontsLoaded,
    blocks,
  ]);

  // -------------------------------------------------------------
  // Early return checks
  // -------------------------------------------------------------
  if (!resumeData) {
    return (
      <div className="flex items-center justify-center h-full bg-zinc-950 border border-dashed border-zinc-800 rounded-lg p-6">
        <p className="text-zinc-500 text-sm font-medium">Input valid JSON to preview the resume.</p>
      </div>
    );
  }

  // Resolve page layout contents to match the measured partition indices
  const allBlockIds = blocks.map((b) => b.id);
  const flatPagesIds = pages.flat();
  const isMismatch =
    allBlockIds.length !== flatPagesIds.length ||
    !allBlockIds.every((id) => flatPagesIds.includes(id));

  const resolvedPages =
    pages.length > 0 && !isMismatch
      ? pages.map((pageBlockIds) =>
          pageBlockIds.map((id) => blocks.find((b) => b.id === id)!).filter(Boolean)
        )
      : [blocks];

  return (
    <div className="w-full h-full overflow-y-auto custom-scrollbar p-6 bg-[#08080a] flex flex-col gap-6 items-center sheet-container">
      {/* Hidden measuring container used for height calculation */}
      <div
        ref={measureRef}
        className="absolute left-[-9999px] top-[-9999px] w-[210mm] pointer-events-none opacity-0"
        style={{
          fontFamily: resumeStyle.fontFamily,
          fontSize: resumeStyle.fontSize,
          lineHeight: resumeStyle.lineHeight,
          paddingLeft: resumeStyle.paddingLeft,
          paddingRight: resumeStyle.paddingRight,
          display: 'flex',
          flexDirection: 'column',
          gap: `${settings.sectionGap}px`,
          boxSizing: 'border-box',
        }}
      >
        {blocks.map((block) => (
          <div key={block.id} data-block-id={block.id} className="w-full">
            {block.render()}
          </div>
        ))}
      </div>

      {/* Rendered pages wrapper */}
      <div
        className="flex flex-col gap-6 items-center origin-top sheet-pages-wrapper"
        style={{ zoom: zoom }}
      >
        {resolvedPages.map((pageBlocks, pageIdx) => (
          <div
            key={pageIdx}
            className="w-[210mm] h-[297mm] bg-white text-zinc-900 shadow-2xl border border-zinc-200 text-left box-border shrink-0 relative flex flex-col sheet-page select-text"
            style={{
              fontFamily: resumeStyle.fontFamily,
              fontSize: resumeStyle.fontSize,
              lineHeight: resumeStyle.lineHeight,
              paddingTop: resumeStyle.paddingTop,
              paddingBottom: resumeStyle.paddingBottom,
              paddingLeft: resumeStyle.paddingLeft,
              paddingRight: resumeStyle.paddingRight,
            }}
          >
            {/* Rendered flow items */}
            <div className="flex flex-col flex-1" style={{ gap: `${settings.sectionGap}px` }}>
              {pageBlocks.map((block) => (
                <div key={block.id} className="w-full">
                  {block.render()}
                </div>
              ))}
            </div>

            {/* Page numbers */}
            {settings.showPageNumbers && resolvedPages.length > 1 && (
              <div
                className="absolute left-0 right-0 text-center text-[8pt] text-zinc-400 font-mono font-medium select-none"
                style={{ bottom: `${settings.marginBottom * 0.5}in` }}
              >
                Page {pageIdx + 1} of {resolvedPages.length}
              </div>
            )}

            {/* Page break boundary guide (preview only) */}
            <div
              className="absolute left-0 right-0 bottom-0 border-b border-dashed border-rose-300 pointer-events-none no-print"
              style={{ zIndex: 10 }}
            >
              <span className="absolute right-4 -top-2.5 bg-rose-50 text-rose-700 text-[8px] font-mono px-1.5 py-0.5 rounded border border-rose-200 uppercase tracking-wider font-semibold select-none shadow-sm">
                Page {pageIdx + 1} End
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
