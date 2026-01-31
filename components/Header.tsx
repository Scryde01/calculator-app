
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 py-6">
      <div className="container mx-auto px-4 max-w-5xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-100">
            %
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">Freelance Rate Calc</h1>
            <p className="text-xs text-slate-500 font-medium">Professional Rate Benchmarking</p>
          </div>
        </div>
        <div className="hidden sm:block text-xs font-semibold text-slate-400 uppercase tracking-widest">
          MVP v1.0
        </div>
      </div>
    </header>
  );
};
