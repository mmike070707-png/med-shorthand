import React, { useState } from 'react';

export default function MedShorthandKeyboard({ onInsertText }) {
  const [activeTab, setActiveTab] = useState('vitals');

  const shortcuts = {
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

  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-t-xl p-3 shadow-2xl text-slate-100 select-none">
      <div className="flex gap-2 mb-3 border-b border-slate-800 pb-2 overflow-x-auto">
        {Object.keys(shortcuts).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${
              activeTab === cat ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        {shortcuts[activeTab].map((item, idx) => (
          <button
            key={idx}
            onClick={() => onInsertText(item.text)}
            className="flex flex-col items-start p-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg active:scale-95 transition-all text-left"
          >
            <span className="text-xs font-bold text-blue-400">{item.label}</span>
            <span className="text-[11px] text-slate-300 truncate w-full mt-0.5">{item.text}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
        <button onClick={() => onInsertText('. ')} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300">. (Period)</button>
        <button onClick={() => onInsertText(', ')} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300">, (Comma)</button>
        <button onClick={() => onInsertText(' — ')} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300">— (Dash)</button>
        <button onClick={() => onInsertText('\n')} className="px-4 py-1 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded">Enter ↵</button>
      </div>
    </div>
  );
}
