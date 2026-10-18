'use client';
import { useState, useEffect, useRef } from 'react';
import MedShorthandKeyboard from '@/components/MedShorthandKeyboard';
import TermsModal from '@/components/TermsModal';

export default function ChartingPage() {
  const [noteText, setNoteText] = useState('');
  const [isAccepted, setIsAccepted] = useState(false);
  const textareaRef = useRef(null);

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
    const textarea = textareaRef.current;
    if (!textarea) {
      setNoteText((prev) => prev + (prev ? ' ' : '') + textToInsert);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText = noteText.substring(0, start) + textToInsert + noteText.substring(end);
    
    setNoteText(newText);

    // Keep focus and restore cursor position after insertion
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + textToInsert.length, start + textToInsert.length);
    }, 0);
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-slate-950 text-white relative overflow-hidden">
      {!isAccepted && <TermsModal onAccept={handleAcceptTerms} />}

      <div className="flex-1 p-3 flex flex-col overflow-y-auto">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-base font-bold">MedNote Active Chart</h1>
          <span className="text-[9px] bg-red-950 text-red-300 border border-red-800 px-2 py-0.5 rounded uppercase font-semibold">
            HIPAA Firewall Active
          </span>
        </div>
        <textarea
          ref={textareaRef}
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Tap here to type or use shortcuts below..."
          className="w-full flex-1 p-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-blue-500 resize-none shadow-inner text-sm"
        />
      </div>

      <MedShorthandKeyboard onInsertText={handleInsert} />
    </div>
  );
}
