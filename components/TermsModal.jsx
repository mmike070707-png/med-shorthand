import React, { useState, useRef } from 'react';

export default function TermsModal({ onAccept }) {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const scrollRef = useRef(null);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight + 20) {
      setHasScrolledToBottom(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 select-none">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl flex flex-col max-h-[90vh] text-slate-100">
        <div className="p-4 border-b border-slate-800">
          <h2 className="text-lg font-bold text-red-400">MEDNOTE COMPLIANCE FIREWALL & LEGAL TERMS</h2>
          <p className="text-xs text-slate-400 mt-1">
            Mandatory Acceptance Required For Every Session. Please review thoroughly.
          </p>
        </div>

        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="p-4 overflow-y-auto flex-1 text-xs text-slate-300 space-y-4 leading-relaxed border-b border-slate-800 bg-slate-950/50"
        >
          <h3 className="font-bold text-slate-200">SECTION 1: REGULATORY COMPLIANCE AND HIPAA BOUNDARIES</h3>
          <p>
            The User expressly acknowledges and agrees that they bear sole and exclusive legal responsibility for determining their status as a "Covered Entity" or "Business Associate" under HIPAA, HITECH Act, and implementing regulations. The Service functions strictly as a neutral technical utility for shorthand input. Under no circumstances shall developers be construed as a Business Associate without an executed BAA.
          </p>
          <p>
            Users are strictly prohibited from inputting, transmitting, or storing unencrypted, unmasked, or fully identifiable Protected Health Information (PHI) unless fully compliant with HIPAA Security Rules. The User assumes absolute liability for regulatory violations.
          </p>

          <h3 className="font-bold text-slate-200">SECTION 2: DISCLAIMER OF MEDICAL AND LEGAL LIABILITY</h3>
          <p>
            The Service is provided solely for administrative documentation and shorthand expansion. The Service does not provide medical diagnosis, treatment recommendations, or professional medical advice. The Clinician remains exclusively and independently responsible for all clinical decisions, medical records, and data accuracy. Users must review and authenticate every word prior to final charting.
          </p>

          <h3 className="font-bold text-slate-200">SECTION 3: LIMITATION OF LIABILITY AND INDEMNIFICATION</h3>
          <p>
            To the maximum extent permitted by law, developers and contributors shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of the Service. The User agrees to defend, indemnify, and hold harmless developers from any claims, regulatory audits, or medical malpractice actions resulting from clinical documentation produced utilizing the Service.
          </p>

          <h3 className="font-bold text-slate-200">SECTION 4: BINDING ARBITRATION</h3>
          <p>
            Any dispute arising out of these Terms or the use of the Service shall be settled by binding arbitration. The User explicitly waives any right to participate in a class-action lawsuit against the developers or operators of MedNote.
          </p>
        </div>

        <div className="p-4 flex flex-col gap-3 bg-slate-900">
          {!hasScrolledToBottom && (
            <p className="text-[11px] text-amber-400 text-center animate-pulse">
              ↓ Please scroll to the bottom of the terms to enable agreement.
            </p>
          )}

          <label className={`flex items-center gap-3 cursor-pointer ${!hasScrolledToBottom ? 'opacity-50 pointer-events-none' : ''}`}>
            <input 
              type="checkbox" 
              checked={isChecked} 
              onChange={(e) => setIsChecked(e.target.checked)}
              disabled={!hasScrolledToBottom}
              className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-xs text-slate-200 font-medium">
              I have read, understood, and unconditionally agree to the MedNote Terms of Service, HIPAA Liabilities, and Compliance Firewall.
            </span>
          </label>

          <button
            onClick={onAccept}
            disabled={!isChecked}
            className={`w-full py-2.5 rounded-lg text-sm font-bold transition-all ${
              isChecked 
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 cursor-pointer' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            Acknowledge & Enter MedNote Session
          </button>
        </div>
      </div>
    </div>
  );
}
