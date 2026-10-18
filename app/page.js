'use client';
import { useState, useEffect } from 'react';
import MedShorthandKeyboard from '@/components/MedShorthandKeyboard';
import TermsModal from '@/components/TermsModal';

export default function ChartingPage() {
  const [noteText, setNoteText] = useState('');
  const [isAccepted, setIsAccepted] = useState(false);

  useEffect(() => {
    const sessionAgreed = sessionStorage.getItem('mednote_terms_accepted');
    if (sessionAgreed === 'true') {
      setIsAccepted(true);
    }
  }, []);

  const handleAcceptTerms = () => {
    sessionStorage.setItem('mednote_terms_accepted', 'true');
    setIsAccepted(true);
  };

  const handleInsert = (textToInsert) => {
    setNoteText((prev) => prev + (prev ? ' ' : '') + textToInsert);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-white relative">
      {!isAccepted && <TermsModal onAccept={handleAcceptTerms} />}

      <div className="flex-1 p-4 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-lg font-bold">MedNote Active Chart</h1>
          <span className="text-[10px] bg-red-950 text-red-300 border border-red-800 px-2 py-0.5 rounded uppercase font-semibold">
            HIPAA Compliance Firewall Active
          </span>
        </div>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Tap shortcuts below to record vitals and observations..."
          className="w-full flex-1 p-4 bg-slate-900 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-blue-500 resize-none shadow-inner"
        />
      </div>

      <MedShorthandKeyboard onInsertText={handleInsert} />
    </div>
  );
}
