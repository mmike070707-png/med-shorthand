'use client';
import { useState } from 'react';
import MedShorthandKeyboard from '@/components/MedShorthandKeyboard';

export default function ChartingPage() {
  const [noteText, setNoteText] = useState('');

  const handleInsert = (textToInsert) => {
    setNoteText((prev) => prev + (prev ? ' ' : '') + textToInsert);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-white">
      <div className="flex-1 p-4 flex flex-col">
        <h1 className="text-lg font-bold mb-2">MedNote Active Chart</h1>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Tap shortcuts below to record vitals and observations..."
          className="w-full flex-1 p-4 bg-slate-900 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-blue-500 resize-none"
        />
      </div>
      <MedShorthandKeyboard onInsertText={handleInsert} />
    </div>
  );
}
