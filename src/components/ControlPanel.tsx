import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import {
  Code,
  Settings,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Activity,
  FileUp,
  FileDown,
} from 'lucide-react';
import { ScoreResult } from '../utils/scoreCalculator';

export interface ControlPanelProps {
  jsonText: string;
  setJsonText: (val: string) => void;
  onReset: () => void;
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
  setSettings: React.Dispatch<
    React.SetStateAction<{
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
    }>
  >;
  scoreResult: ScoreResult | null;
  syntaxError: string | null;
}

export default function ControlPanel({
  jsonText,
  setJsonText,
  onReset,
  settings,
  setSettings,
  scoreResult,
  syntaxError,
}: ControlPanelProps) {
  const [activeTab, setActiveTab] = useState<'editor' | 'design' | 'score'>('editor');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === 'string') {
        setJsonText(text);
      }
    };
    reader.readAsText(file);
    // Reset file input value so upload triggers again for same file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDownloadJson = () => {
    const blob = new Blob([jsonText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Helper to render feedback icon
  const renderFeedbackIcon = (type: 'pass' | 'warn' | 'fail') => {
    switch (type) {
      case 'pass':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />;
      case 'warn':
        return <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />;
      case 'fail':
        return <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col bg-[#0c0c0f] border border-zinc-900 rounded-xl overflow-hidden h-full shadow-xl">
      {/* Tab Navigation */}
      <div className="flex items-center gap-1.5 p-1.5 bg-[#0f0f13]/80 border-b border-zinc-900 shrink-0">
        <button
          onClick={() => setActiveTab('editor')}
          className={`flex items-center justify-center gap-2 px-3 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg flex-1 transition-all duration-200 cursor-pointer ${
            activeTab === 'editor'
              ? 'bg-zinc-800 text-white shadow-sm ring-1 ring-zinc-700/50'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          JSON Editor
        </button>
        <button
          onClick={() => setActiveTab('design')}
          className={`flex items-center justify-center gap-2 px-3 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg flex-1 transition-all duration-200 cursor-pointer ${
            activeTab === 'design'
              ? 'bg-zinc-800 text-white shadow-sm ring-1 ring-zinc-700/50'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          Customizer
        </button>
        <button
          onClick={() => setActiveTab('score')}
          className={`flex items-center justify-center gap-2 px-3 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg flex-1 transition-all duration-200 cursor-pointer relative ${
            activeTab === 'score'
              ? 'bg-zinc-800 text-white shadow-sm ring-1 ring-zinc-700/50'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          Score
          {scoreResult && scoreResult.score < 80 && (
            <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse border-2 border-[#0c0c0f]"></span>
          )}
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {activeTab === 'editor' && (
          <div className="flex flex-col h-full gap-3">
            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-900/30 p-2 rounded-xl border border-zinc-900">
              <div className="flex gap-2">
                <input
                  type="file"
                  accept=".json"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg transition-colors cursor-pointer"
                  title="Upload resume.json file"
                >
                  <FileUp className="w-3.5 h-3.5" />
                  Upload
                </button>
                <button
                  onClick={handleDownloadJson}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg transition-colors cursor-pointer"
                  title="Export resume.json to your computer"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  Backup JSON
                </button>
              </div>
              <button
                onClick={onReset}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-zinc-900/60 hover:bg-zinc-900 text-zinc-400 hover:text-rose-400 rounded-lg border border-zinc-800/40 hover:border-rose-900/40 transition-all cursor-pointer ml-auto"
                title="Reset editor to sample data"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

            {/* Error Message */}
            {syntaxError && (
              <div className="flex items-start gap-2 p-3 bg-rose-950/40 border border-rose-800/50 text-rose-300 rounded-lg text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="font-mono">{syntaxError}</span>
              </div>
            )}

            {/* Monaco Editor Container */}
            <div className="flex-1 min-h-[300px] rounded-xl overflow-hidden shadow-inner ring-1 ring-zinc-900/80">
              <Editor
                height="100%"
                defaultLanguage="json"
                theme="vs-dark"
                value={jsonText}
                onChange={(val) => setJsonText(val || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  wordWrap: 'on',
                  suggestOnTriggerCharacters: true,
                  formatOnPaste: true,
                }}
              />
            </div>
          </div>
        )}

        {activeTab === 'design' && (
          <div className="flex flex-col gap-6 text-zinc-300">
            <div>
              <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2.5">
                Font & Typography
              </h3>
              <div className="flex flex-col gap-4 bg-zinc-900/20 p-4 rounded-xl border border-zinc-900/60">
                {/* Font Selector */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-zinc-400">Resume Font Family</label>
                  <select
                    value={settings.fontFamily}
                    onChange={(e) => setSettings({ ...settings, fontFamily: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-zinc-500 cursor-pointer"
                  >
                    <option value="Source Sans 3">
                      Source Sans 3 (Sans-Serif - Elegant & Modern)
                    </option>
                    <option value="Libre Baskerville">
                      Libre Baskerville (Serif - Editorial & Classic)
                    </option>
                    <option value="Arial">Arial (Sans-Serif - Classic & Score-Friendly)</option>
                    <option value="Helvetica">Helvetica (Sans-Serif - Clean & Modern)</option>
                    <option value="Calibri">Calibri (Sans-Serif - Soft & Professional)</option>
                    <option value="Verdana">Verdana (Sans-Serif - Wide & Readable)</option>
                    <option value="Georgia">Georgia (Serif - Elegant & Clear)</option>
                    <option value="Garamond">Garamond (Serif - Refined & Space-saving)</option>
                    <option value="Times New Roman">Times New Roman (Serif - Traditional)</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2.5">
                Color Accent
              </h3>
              <div className="bg-zinc-900/20 p-4 rounded-xl border border-zinc-900/60">
                {/* Link Color */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-zinc-400">Hyperlink Color</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-xs cursor-pointer">
                      <input
                        type="radio"
                        name="linkColor"
                        value="blue"
                        checked={settings.linkColor === 'blue'}
                        onChange={() => setSettings({ ...settings, linkColor: 'blue' })}
                        className="w-3.5 h-3.5 accent-blue-500 cursor-pointer"
                      />
                      <span className="text-blue-400 font-medium">Link Blue (#2563eb)</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs cursor-pointer">
                      <input
                        type="radio"
                        name="linkColor"
                        value="black"
                        checked={settings.linkColor === 'black'}
                        onChange={() => setSettings({ ...settings, linkColor: 'black' })}
                        className="w-3.5 h-3.5 accent-white cursor-pointer"
                      />
                      <span className="text-white font-medium">Black (#000000)</span>
                    </label>
                  </div>
                  <span className="text-[10px] text-zinc-500 mt-1">
                    Classic resumes usually use black text or royal blue links. Blue links make URLs
                    stand out.
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2.5">
                Layout Margins & Spacing
              </h3>
              <div className="flex flex-col gap-4 bg-zinc-900/20 p-4 rounded-xl border border-zinc-900/60">
                {/* Top Margin (Header Space) */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-zinc-400">Top Margin (Header Space)</span>
                    <span className="font-mono text-white">{settings.marginTop}in</span>
                  </div>
                  <input
                    type="range"
                    min="0.25"
                    max="1.2"
                    step="0.05"
                    value={settings.marginTop}
                    onChange={(e) =>
                      setSettings({ ...settings, marginTop: parseFloat(e.target.value) })
                    }
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                </div>

                {/* Bottom Margin (Footer Space) */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-zinc-400">Bottom Margin (Footer Space)</span>
                    <span className="font-mono text-white">{settings.marginBottom}in</span>
                  </div>
                  <input
                    type="range"
                    min="0.25"
                    max="1.2"
                    step="0.05"
                    value={settings.marginBottom}
                    onChange={(e) =>
                      setSettings({ ...settings, marginBottom: parseFloat(e.target.value) })
                    }
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                </div>

                {/* Side Margins */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-zinc-400">Side Margins</span>
                    <span className="font-mono text-white">{settings.marginSide}in</span>
                  </div>
                  <input
                    type="range"
                    min="0.25"
                    max="1.2"
                    step="0.05"
                    value={settings.marginSide}
                    onChange={(e) =>
                      setSettings({ ...settings, marginSide: parseFloat(e.target.value) })
                    }
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                </div>

                {/* Line Height */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-zinc-400">Line Height</span>
                    <span className="font-mono text-white">{settings.lineHeight}</span>
                  </div>
                  <input
                    type="range"
                    min="1.1"
                    max="1.7"
                    step="0.05"
                    value={settings.lineHeight}
                    onChange={(e) =>
                      setSettings({ ...settings, lineHeight: parseFloat(e.target.value) })
                    }
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                </div>

                {/* Section Spacing */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-zinc-400">Section Gap</span>
                    <span className="font-mono text-white">{settings.sectionGap}px</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="20"
                    step="1"
                    value={settings.sectionGap}
                    onChange={(e) =>
                      setSettings({ ...settings, sectionGap: parseInt(e.target.value) })
                    }
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2.5">
                Visibility Settings
              </h3>
              <div className="flex flex-col gap-3 bg-zinc-900/20 p-4 rounded-xl border border-zinc-900/60">
                {/* Page Numbers Toggle */}
                <label className="flex items-center gap-3 text-xs text-zinc-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={settings.showPageNumbers}
                    onChange={(e) =>
                      setSettings({ ...settings, showPageNumbers: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-zinc-800 bg-zinc-950 text-white accent-white cursor-pointer"
                  />
                  <span>Show Page Numbers (e.g. "Page 1 of 2")</span>
                </label>

                {/* Icons Toggle */}
                <label className="flex items-center gap-3 text-xs text-zinc-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={settings.showIcons}
                    onChange={(e) => setSettings({ ...settings, showIcons: e.target.checked })}
                    className="w-4 h-4 rounded border-zinc-800 bg-zinc-950 text-white accent-white cursor-pointer"
                  />
                  <span>Show Header Contact Icons</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'score' && (
          <div className="flex flex-col gap-5 text-zinc-300">
            {/* Score Radial/Header */}
            {scoreResult && (
              <div className="bg-[#0f0f13] p-5 border border-zinc-900 rounded-xl flex items-center justify-between gap-4 shadow-inner">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-black">
                    Resume Score Fit
                  </span>
                  <span className="text-4xl font-black text-white leading-none">
                    {scoreResult.score}
                    <span className="text-lg font-medium text-zinc-500">/100</span>
                  </span>
                  <div className="text-xs">
                    {scoreResult.score >= 85 ? (
                      <span className="text-emerald-400 font-bold">
                        Ready to Apply! Excellent format.
                      </span>
                    ) : scoreResult.score >= 60 ? (
                      <span className="text-amber-400 font-bold">Good, but could be improved.</span>
                    ) : (
                      <span className="text-rose-400 font-extrabold">
                        Needs attention before sending.
                      </span>
                    )}
                  </div>
                </div>

                {/* Score indicator badge */}
                <div
                  className={`h-16 w-16 bg-zinc-950 border rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden shrink-0 ${
                    scoreResult.score >= 85
                      ? 'border-emerald-500/20'
                      : scoreResult.score >= 60
                        ? 'border-amber-500/20'
                        : 'border-rose-500/20'
                  }`}
                >
                  <div
                    className={`absolute inset-0 opacity-10 filter blur-sm ${
                      scoreResult.score >= 85
                        ? 'bg-emerald-500'
                        : scoreResult.score >= 60
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                    }`}
                  />
                  <div
                    className={`text-lg font-black font-mono relative z-10 ${
                      scoreResult.score >= 85
                        ? 'text-emerald-400'
                        : scoreResult.score >= 60
                          ? 'text-amber-400'
                          : 'text-rose-500'
                    }`}
                  >
                    {scoreResult.score}%
                  </div>
                </div>
              </div>
            )}

            {/* Feedback Breakdown */}
            <div>
              <h4 className="text-[10px] uppercase tracking-wider font-black text-zinc-400 mb-3">
                Score Analysis Report
              </h4>
              <div className="flex flex-col gap-2.5">
                {scoreResult?.feedback.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-3.5 rounded-lg text-xs border font-medium ${
                      item.type === 'pass'
                        ? 'bg-emerald-950/20 border-emerald-900/30 text-zinc-200'
                        : item.type === 'warn'
                          ? 'bg-amber-950/20 border-amber-900/30 text-zinc-200'
                          : 'bg-rose-950/20 border-rose-900/30 text-zinc-200'
                    }`}
                  >
                    {renderFeedbackIcon(item.type)}
                    <div className="leading-relaxed">
                      <p>{item.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
