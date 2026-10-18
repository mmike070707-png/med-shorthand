import React, { useState, useEffect } from 'react';

export default function MacroEditor({ isOpen, onClose, onMacrosUpdated }) {
  const [macros, setMacros] = useState([]);
  const [label, setLabel] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem('mednote_custom_macros');
      if (saved) {
        try {
          setMacros(JSON.parse(saved));
        } catch (e) {
          setMacros([]);
        }
      }
    }
  }, [isOpen]);

  const handleAddMacro = (e) => {
    e.preventDefault();
    if (!label.trim() || !text.trim()) return;

    const newMacro = { label: label.trim(), text: text.trim() };
    const updated = [...macros, newMacro];
    
    setMacros(updated);
    localStorage.setItem('mednote_custom_macros', JSON.stringify(updated));
    
    setLabel('');
    setText('');
    if (onMacrosUpdated) onMacrosUpdated(updated);
  };

  const handleDeleteMacro = (indexToRemove) => {
    const updated = macros.filter((_, idx) => idx !== indexToRemove);
    setMacros(updated);
    localStorage.setItem('mednote_custom_macros', JSON.stringify(updated));
    if (onMacrosUpdated) onMacrosUpdated(updated);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 select-none">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-xl shadow-2xl flex flex-col max-h-[85vh] text-slate-100">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-slate-800">
          <h2 className="text-base font-bold text-blue-400">Custom Macro & Abbreviation Editor</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 text-xs"
          >
            ✕ Close
          </button>
        </div>

        {/* Add Macro Form */}
        <form onSubmit={handleAddMacro} className="p-4 border-b border-slate-800 space-y-3 bg-slate-950/40">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Add New Shortcut</h3>
          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Shortcut Button Label (e.g., "Post-Op Check")</label>
            <input 
              type="text" 
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Button Label..."
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Expanded Text / Note Content</label>
            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Full text phrase to insert..."
              rows={2}
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>
          <button 
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold transition-all shadow"
          >
            Save Custom Macro
          </button>
        </form>

        {/* Existing Macros List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-2">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Saved Custom Macros ({macros.length})</h3>
          {macros.length === 0 ? (
            <p className="text-xs text-slate-500 italic text-center py-4">No custom macros saved yet. Add your first abbreviation above!</p>
          ) : (
            macros.map((macro, idx) => (
              <div key={idx} className="flex items-start justify-between p-2.5 bg-slate-800 border border-slate-700 rounded-lg gap-2">
                <div className="overflow-hidden">
                  <span className="text-xs font-bold text-blue-400 block">{macro.label}</span>
                  <span className="text-[11px] text-slate-300 truncate block">{macro.text}</span>
                </div>
                <button 
                  type="button"
                  onClick={() => handleDeleteMacro(idx)}
                  className="text-red-400 hover:text-red-300 text-xs px-2 py-1 bg-slate-900 rounded border border-slate-700 shrink-0"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
