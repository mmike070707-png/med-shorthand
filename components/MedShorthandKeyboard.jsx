import React, { useState, useEffect } from 'react';

export default function MedShorthandKeyboard({ onInsertText, onOpenEditor }) {
  const [activeTab, setActiveTab] = useState('vitals');
  const [customMacros, setCustomMacros] = useState([]);

  useEffect(() => {
    const loadCustom = () => {
      const saved = localStorage.getItem('mednote_custom_macros');
      if (saved) {
        try {
          setCustomMacros(JSON.parse(saved));
        } catch (e) {
          setCustomMacros([]);
        }
      }
    };
    loadCustom();
    window.addEventListener('storage', loadCustom);
    return () => window.removeEventListener('storage', loadCustom);
  }, []);

  const defaultShortcuts = {
    vitals: [
      { label: 'BP / HR / O2', text: 'BP: 120/80 mmHg | HR: 72 bpm | SpO2: 98% room air' },
      { label: 'Temp / RR', text: 'Temp: 98.6°F | RR: 16 breaths/min, unlabored' },
      { label: 'Neuro Check', text: 'Alert and oriented x4. PERRLA. No acute deficits.' },
      { label: 'Pain Score', text: 'Pain: 0/10. Denies acute discomfort.' }
    ],
    charting: [
      { label: 'WNL (Normal)', text: 'All examined systems are within normal limits (WNL).' },
      { label: 'Stable', text: 'Patient condition stable, resting quietly at baseline.' },
      { label: 'Follow-up', text: 'Routine follow-up in 2 weeks or prn.' },
      { label: 'Cleared', text: 'Cleared to resume normal activities.' }
    ],
    actions: [
      { label: 'Reviewed', text: 'Reviewed status, history, and care plan with patient.' },
      { label: 'Educated', text: 'Provided verbal and written instructions; patient understood.' },
      { label: 'Escalated', text: 'Findings escalated to supervising provider.' }
    ]
  };

  const currentShortcuts = activeTab === 'custom' ? customMacros : (defaultShortcuts[activeTab] || []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t-2 border-blue-600 p-2.5 shadow-[0_-10px_25px_rgba(0,0,0,0.8)] text-slate-100 select-none">
      {/* Tabs Row + Manage Button */}
      <div className="flex items-center justify-between gap-2 mb-2 pb-1 border-b border-slate-800">
        <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
          {['vitals', 'charting', 'actions', 'custom'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveTab(cat)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg capitalize whitespace-nowrap transition-colors ${
                activeTab === cat ? 'bg-blue-600 text-white shadow' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {cat === 'custom' ? `Custom (${customMacros.length})` : cat}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onOpenEditor}
          className="px-2.5 py-1 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-blue-400 rounded-lg border border-slate-700 shrink-0"
        >
          ⚙️ Manage
        </button>
      </div>

      {/* Shortcut Grid */}
      <div className="grid grid-cols-2 gap-1.5 mb-2">
        {currentShortcuts.length === 0 && activeTab === 'custom' ? (
          <div className="col-span-2 flex items-center justify-center text-xs text-slate-500 italic py-2">
            No custom macros yet. Tap "⚙️ Manage" above to add your own.
          </div>
        ) : (
          currentShortcuts.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onInsertText(item.text)}
              className="flex flex-col items-start p-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 border border-slate-700 rounded-md transition-all text-left shadow-sm"
            >
              <span className="text-[11px] font-bold text-blue-400">{item.label}</span>
              <span className="text-[10px] text-slate-300 truncate w-full">{item.text}</span>
            </button>
          ))
        )}
      </div>

      {/* Utility Bar */}
      <div className="flex items-center justify-between pt-1.5 border-t border-slate-800 text-xs text-slate-400">
        <button type="button" onClick={() => onInsertText('. ')} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300">. (Period)</button>
        <button type="button" onClick={() => onInsertText(', ')} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300">, (Comma)</button>
        <button type="button" onClick={() => onInsertText(' — ')} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300">— (Dash)</button>
        <button type="button" onClick={() => onInsertText('\n')} className="px-4 py-1 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded shadow">Enter ↵</button>
      </div>
    </div>
  );
}
