'use client';

import { useState } from 'react';
import { Search, Copy, Check, Plus, Stethoscope, Download } from 'lucide-react';

interface ShorthandItem {
  id: string;
  shortcut: string;
  expansion: string;
  category: string;
}

const INITIAL_ENTRIES: ShorthandItem[] = [
  { id: '1', shortcut: 'sob', expansion: 'Shortness of breath', category: 'Pulmonary' },
  { id: '2', shortcut: 'bid', expansion: 'Twice a day (bis in die)', category: 'Pharmacology' },
  { id: '3', shortcut: 'tid', expansion: 'Three times a day (ter in die)', category: 'Pharmacology' },
  { id: '4', shortcut: 'qid', expansion: 'Four times a day (quater in die)', category: 'Pharmacology' },
  { id: '5', shortcut: 'c/o', expansion: 'Complains of', category: 'General' },
  { id: '6', shortcut: 'htn', expansion: 'Hypertension', category: 'Cardiology' },
  { id: '7', shortcut: 'dm', expansion: 'Diabetes Mellitus', category: 'Endocrinology' },
  { id: '8', shortcut: 'fx', expansion: 'Fracture', category: 'Orthopedics' },
];

export default function MedShorthandApp() {
  const [entries, setEntries] = useState<ShorthandItem[]>(INITIAL_ENTRIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [newShortcut, setNewShortcut] = useState('');
  const [newExpansion, setNewExpansion] = useState('');
  const [newCategory, setNewCategory] = useState('General');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newShortcut || !newExpansion) return;
    const newItem: ShorthandItem = {
      id: Date.now().toString(),
      shortcut: newShortcut.toLowerCase(),
      expansion: newExpansion,
      category: newCategory,
    };
    setEntries([newItem, ...entries]);
    setNewShortcut('');
    setNewExpansion('');
  };

  const downloadFile = (content: string, fileName: string, contentType: string) => {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const exportJSON = () => {
    const dataStr = JSON.stringify(entries, null, 2);
    downloadFile(dataStr, 'med_shorthand_dictionary.json', 'application/json');
  };

  const exportCSV = () => {
    const headers = ['Shortcut', 'Expansion', 'Category'];
    const rows = entries.map((e) => [
      `"${e.shortcut.replace(/"/g, '""')}"`,
      `"${e.expansion.replace(/"/g, '""')}"`,
      `"${e.category.replace(/"/g, '""')}"`,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    downloadFile(csvContent, 'med_shorthand_dictionary.csv', 'text/csv');
  };

  const filteredEntries = entries.filter(
    (item) =>
      item.shortcut.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.expansion.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600 text-white rounded-xl shadow-md">
              <Stethoscope className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">MedShorthand</h1>
              <p className="text-slate-500">Quick medical abbreviation & expansion reference tool</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={exportJSON}
              className="px-3.5 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all"
            >
              <Download className="w-3.5 h-3.5" /> Export JSON
            </button>
            <button
              onClick={exportCSV}
              className="px-3.5 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all"
            >
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Add Custom Entry</h2>
            <form onSubmit={handleAddEntry} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Shortcut</label>
                <input
                  type="text"
                  value={newShortcut}
                  onChange={(e) => setNewShortcut(e.target.value)}
                  placeholder="e.g. nka"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Expansion</label>
                <input
                  type="text"
                  value={newExpansion}
                  onChange={(e) => setNewExpansion(e.target.value)}
                  placeholder="e.g. No known allergies"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Category</label>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="e.g. General"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
              >
                <Plus className="w-4 h-4" /> Add Shorthand
              </button>
            </form>
          </div>

          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search shortcuts, expansions, or categories..."
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex-1 overflow-y-auto max-h-[400px] space-y-3">
              {filteredEntries.length === 0 ? (
                <p className="text-center text-slate-400 py-8 text-sm">No medical shorthands found.</p>
              ) : (
                filteredEntries.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-xs border border-blue-200">
                          {item.shortcut}
                        </span>
                        <span className="text-xs font-medium text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-slate-800 font-medium text-sm mt-1">{item.expansion}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(item.expansion, item.id)}
                      className="p-2 text-slate-500 hover:text-blue-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all shadow-xs"
                      title="Copy expansion"
                    >
                      {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
/* Final comment: Updated Medical Shorthand dashboard with JSON/CSV export functionality */
