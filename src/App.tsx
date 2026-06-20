import React, { useState, useEffect } from 'react';
import ControlPanel from './components/ControlPanel';
import ResumePreview from './components/ResumePreview';
import { parseResumeJson, getDefaultResumeTemplate, Resume } from './utils/resumeParser';
import { calculateScore, ScoreResult } from './utils/scoreCalculator';
import { Download } from 'lucide-react';

export interface SettingsState {
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
}

export default function App() {
  // Initialize with standard resume template
  const defaultTemplateStr = JSON.stringify(getDefaultResumeTemplate(), null, 2);
  const [jsonText, setJsonText] = useState<string>(defaultTemplateStr);
  const [resumeData, setResumeData] = useState<Resume | null>(null);
  const [syntaxError, setSyntaxError] = useState<string | null>(null);
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const [zoom, setZoom] = useState<number>(1.1); // Default zoom level (110%)

  // Resume design settings state
  const [settings, setSettings] = useState<SettingsState>({
    fontFamily: 'Source Sans 3',
    fontSize: 10,
    marginTop: 0.5,
    marginBottom: 0.5,
    marginSide: 0.5,
    sectionGap: 10,
    lineHeight: 1.35,
    linkColor: 'blue',
    showPageNumbers: true,
    showIcons: true,
  });

  // Parse and evaluate resume data when JSON changes
  useEffect(() => {
    const { data, error } = parseResumeJson(jsonText);

    if (error) {
      setSyntaxError(error);
      // Reset state if JSON text is empty
      if (!jsonText || jsonText.trim() === '') {
        setResumeData(null);
        setScoreResult(null);
      }
    } else {
      setSyntaxError(null);
      setResumeData(data);

      // Calculate resume score
      const scoreAnalysis = calculateScore(data);
      setScoreResult(scoreAnalysis);
    }
  }, [jsonText]);

  // Handle resetting content to default template
  const handleReset = () => {
    if (
      window.confirm(
        'Are you sure you want to reset the editor to the default template? Your current changes will be lost.'
      )
    ) {
      setJsonText(defaultTemplateStr);
    }
  };

  // Trigger browser print dialog for PDF download
  const handleDownloadPdf = () => {
    window.print();
  };

  return (
    <div className="app-container h-screen bg-[#060608] text-zinc-100 flex flex-col antialiased overflow-hidden">
      {/* Header (No print) */}
      <header className="hidden lg:flex no-print border-b border-zinc-800 bg-[#09090b] px-6 py-3 items-center justify-between sticky top-0 z-50 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-black tracking-widest text-white uppercase m-0 leading-none">
            build-yo-resume
          </h1>
        </div>

        {/* Global actions and metrics */}
        <div className="flex items-center gap-3">
          {scoreResult && (
            <div className="hidden sm:flex items-center gap-3 px-3.5 py-1.5 bg-zinc-900/60 border border-zinc-800/40 rounded-xl select-none">
              <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider">
                Score Fit
              </span>
              <div className="w-16 h-1.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800/30">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    scoreResult.score >= 85
                      ? 'bg-emerald-500'
                      : scoreResult.score >= 60
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                  }`}
                  style={{ width: `${scoreResult.score}%` }}
                />
              </div>
              <span
                className={`font-mono text-xs font-black ${
                  scoreResult.score >= 85
                    ? 'text-emerald-400'
                    : scoreResult.score >= 60
                      ? 'text-amber-400'
                      : 'text-rose-500'
                }`}
              >
                {scoreResult.score}%
              </span>
            </div>
          )}

          <button
            onClick={handleDownloadPdf}
            disabled={!!syntaxError}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded border cursor-pointer ${
              syntaxError
                ? 'bg-zinc-900 border-zinc-800 text-zinc-600 cursor-not-allowed'
                : 'bg-white hover:bg-zinc-200 text-black border-white shadow-sm'
            }`}
            title="Download resume as A4 size PDF"
          >
            <Download className="w-3.5 h-3.5" />
            Download PDF
          </button>
        </div>
      </header>

      {/* Main Workspace - Scaled to fill viewport height, no global scrollbar */}
      <main className="hidden lg:grid main-workspace flex-1 grid-cols-12 gap-6 p-6 w-full h-[calc(100vh-60px)] overflow-hidden">
        {/* Left Column: Control Panel (JSON Input, Settings, Score) (No print) */}
        <div className="lg:col-span-5 h-full overflow-hidden flex flex-col no-print">
          <ControlPanel
            jsonText={jsonText}
            setJsonText={setJsonText}
            onReset={handleReset}
            settings={settings}
            setSettings={setSettings}
            scoreResult={scoreResult}
            syntaxError={syntaxError}
          />
        </div>

        {/* Right Column: Live A4 PDF Preview */}
        <div className="lg:col-span-7 h-full flex flex-col overflow-hidden preview-column">
          {/* Preview Panel Header (No print) */}
          <div className="flex items-center justify-between mb-4 shrink-0 no-print select-none">
            <div className="flex items-center gap-4">
              <h2 className="text-xs uppercase tracking-widest font-black text-zinc-100 flex items-center">
                Preview
              </h2>
              {/* Zoom Controls */}
              <div className="flex items-center gap-1 bg-zinc-900/60 border border-zinc-800/40 rounded-lg p-0.5 shadow-inner">
                <button
                  onClick={() => setZoom((prev) => Math.max(0.8, Number((prev - 0.05).toFixed(2))))}
                  className="text-xs text-zinc-400 hover:text-zinc-200 font-mono w-5 h-5 flex items-center justify-center rounded hover:bg-zinc-800/80 transition-colors cursor-pointer select-none"
                  title="Zoom Out"
                >
                  -
                </button>
                <span className="text-[10px] text-zinc-300 font-mono font-bold w-10 text-center select-none">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={() => setZoom((prev) => Math.min(1.5, Number((prev + 0.05).toFixed(2))))}
                  className="text-xs text-zinc-400 hover:text-zinc-200 font-mono w-5 h-5 flex items-center justify-center rounded hover:bg-zinc-800/80 transition-colors cursor-pointer select-none"
                  title="Zoom In"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Score Tips Info Popover */}
              <div className="relative group">
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 hover:text-zinc-200 border border-zinc-800/60 rounded-lg bg-zinc-900/40 hover:bg-zinc-800/40 transition-colors cursor-pointer select-none"
                  aria-label="Score Tips"
                >
                  Score Tips
                </button>
                <div className="absolute right-0 top-9 w-80 p-5 bg-zinc-900 border border-zinc-800/80 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.85)] invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 z-50 text-xs text-zinc-300 leading-relaxed font-sans">
                  <h4 className="font-bold text-white mb-3.5 uppercase text-[10px] tracking-wider text-emerald-400 border-b border-zinc-800/60 pb-1.5">
                    Score Best Practices
                  </h4>
                  <div className="space-y-3.5">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">
                        How it works
                      </span>
                      <p className="text-zinc-200">
                        The evaluator checks basic contact details, verified professional links,
                        complete work/education timelines, and skill keyword counts.
                      </p>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">
                        Keywords & JD
                      </span>
                      <p className="text-zinc-200">
                        Tailor your resume by adding specific terms, tools, and technologies from
                        the Job Description directly into your{' '}
                        <code className="text-zinc-100 bg-zinc-950 px-1 py-0.5 rounded font-mono text-[9px]">
                          skills
                        </code>{' '}
                        lists.
                      </p>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">
                        Metrics & Numbers
                      </span>
                      <p className="text-zinc-200">
                        Quantify accomplishments. Use percentages (%), user counts, and dollar
                        amounts to prove effectiveness (e.g. <em>"reduced cache lag by 14%"</em>).
                      </p>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">
                        Action Verbs
                      </span>
                      <p className="text-zinc-200">
                        Begin every accomplishment statement with a strong action verb (e.g.{' '}
                        <em>Designed</em>, <em>Refactored</em>, <em>Implemented</em>).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* JSON Guide Popover */}
              <div className="relative group">
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 hover:text-zinc-200 border border-zinc-800/60 rounded-lg bg-zinc-900/40 hover:bg-zinc-800/40 transition-colors cursor-pointer select-none"
                  aria-label="JSON Guide"
                >
                  JSON Guide
                </button>
                <div className="absolute right-0 top-9 w-80 p-5 bg-zinc-900 border border-zinc-800/80 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.85)] invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 z-50 text-xs text-zinc-300 leading-relaxed font-sans">
                  <h4 className="font-bold text-white mb-3.5 uppercase text-[10px] tracking-wider text-purple-400 border-b border-zinc-800/60 pb-1.5">
                    Expected JSON Format
                  </h4>
                  <div className="space-y-3.5">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">
                        Required Structure
                      </span>
                      <p className="text-zinc-200">
                        The app expects a single root object with the following fields:
                      </p>
                      <ul className="list-disc list-outside ml-3.5 mt-1 space-y-1 text-zinc-400 font-mono text-[9px]">
                        <li>
                          <strong className="text-zinc-200">basics</strong>: contact info, summary,
                          links
                        </li>
                        <li>
                          <strong className="text-zinc-200">education</strong>: institution, dates,
                          highlights
                        </li>
                        <li>
                          <strong className="text-zinc-200">work</strong>: jobs, roles, highlights
                        </li>
                        <li>
                          <strong className="text-zinc-200">projects</strong>: repository &
                          highlights
                        </li>
                        <li>
                          <strong className="text-zinc-200">skills</strong>: name & keywords list
                        </li>
                        <li>
                          <strong className="text-zinc-200">achievements</strong>: custom string
                          highlights
                        </li>
                        <li>
                          <strong className="text-zinc-200">certifications</strong>: name, issuer &
                          date
                        </li>
                      </ul>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">
                        Get Started
                      </span>
                      <p className="text-zinc-200">
                        Download the template JSON, customize it in your editor, and upload the
                        updated file.
                      </p>
                    </div>
                    <a
                      href={`${import.meta.env.BASE_URL}resume_sample.json`}
                      download="resume_sample.json"
                      className="mt-2 block text-center bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2 px-3 rounded text-[10px] uppercase tracking-wider border border-zinc-700"
                    >
                      Download Sample JSON
                    </a>
                  </div>
                </div>
              </div>

              {/* Print Guide Info Popover */}
              <div className="relative group">
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 hover:text-zinc-200 border border-zinc-800/60 rounded-lg bg-zinc-900/40 hover:bg-zinc-800/40 transition-colors cursor-pointer select-none"
                  aria-label="Print Tips"
                >
                  Print Guide
                </button>
                <div className="absolute right-0 top-9 w-64 p-5 bg-zinc-900 border border-zinc-800/80 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.85)] invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 z-50 text-xs text-zinc-300 leading-relaxed font-sans">
                  <h4 className="font-bold text-white mb-3.5 uppercase text-[10px] tracking-wider text-blue-400 border-b border-zinc-800/60 pb-1.5">
                    Perfect PDF Export
                  </h4>
                  <div className="space-y-3.5">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">
                        Browser Print Settings
                      </span>
                      <ul className="list-disc list-outside ml-3.5 space-y-1 text-zinc-200">
                        <li>
                          Set Destination: <strong className="text-white">Save as PDF</strong>
                        </li>
                        <li>
                          Set Margins: <strong className="text-white">None</strong> or{' '}
                          <strong className="text-white">Default</strong>
                        </li>
                        <li>
                          Enable <strong className="text-white">Background graphics</strong>
                        </li>
                        <li>
                          Disable <strong className="text-white">Headers and footers</strong>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview container with internal scroll */}
          <div className="flex-1 overflow-hidden min-h-0">
            <ResumePreview resumeData={resumeData} settings={settings} zoom={zoom} />
          </div>
        </div>
      </main>

      {/* Mobile/Tablet fallback warning message */}
      <div className="lg:hidden flex flex-col items-center justify-center h-full w-full p-6 text-center bg-[#060608] no-print">
        <div className="max-w-md p-8 rounded-2xl bg-[#0c0c0f] border border-zinc-900/60 shadow-2xl flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-zinc-900/60 flex items-center justify-center border border-zinc-800/40 text-zinc-400 select-none shadow-inner">
            <span className="text-2xl">💻</span>
          </div>
          <div className="space-y-3.5">
            <h1 className="text-base font-black tracking-widest text-white uppercase">
              build-yo-resume
            </h1>
            <p className="text-xs text-zinc-300 leading-relaxed">
              This application is optimized for desktop and laptop environments. Please open it on a
              larger screen to edit your JSON, evaluate your compatibility score, and generate your
              PDF.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
