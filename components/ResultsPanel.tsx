
import React, { useState } from 'react';
import { CalculationResults, CalculatorInputs } from '../types';
import { formatCurrency } from '../lib/format';

interface Props {
  results: CalculationResults | null;
  inputs: CalculatorInputs;
}

export const ResultsPanel: React.FC<Props> = ({ results, inputs }) => {
  const [copied, setCopied] = useState(false);

  if (!results) return null;

  const handleCopy = () => {
    const text = `
Freelance Rate Summary
---------------------
Target: ${formatCurrency(inputs.targetMonthlyIncome, inputs.currency)}/month (Net)
Utilization: ${inputs.utilizationPercent}% (${results.effectiveMonthlyBillableHours.toFixed(1)} hrs/mo)
Tax Rate: ${inputs.taxPercent}%

Suggested Rates:
- Hourly: ${formatCurrency(results.hourlyRate, inputs.currency)}
- Day Rate: ${formatCurrency(results.dayRate, inputs.currency)}
- Monthly Retainer: ${formatCurrency(results.suggestedRetainer, inputs.currency)}

Calculated with precision.
    `.trim();
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statClass = "bg-white p-4 rounded-xl border border-slate-100 shadow-sm";
  const statLabelClass = "text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block";
  const statValueClass = "text-2xl font-black text-slate-900";

  return (
    <div className="bg-slate-900 p-8 md:p-10 rounded-3xl text-white shadow-2xl shadow-indigo-100 flex flex-col gap-8">
      <div>
        <h2 className="text-sm font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">Recommended Rates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm border border-white/10">
            <span className="text-white/60 text-xs font-bold uppercase tracking-widest block mb-1">Hourly Rate</span>
            <div className="text-4xl font-black">{formatCurrency(results.hourlyRate, inputs.currency)}</div>
          </div>
          <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm border border-white/10">
            <span className="text-white/60 text-xs font-bold uppercase tracking-widest block mb-1">Day Rate</span>
            <div className="text-4xl font-black">{formatCurrency(results.dayRate, inputs.currency)}</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.2em]">Financial Breakdown</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 p-4 rounded-xl border border-white/5">
            <span className="text-white/40 text-[10px] font-bold uppercase block mb-1">Monthly Gross Need</span>
            <div className="text-lg font-bold">{formatCurrency(results.monthlyRequiredGross, inputs.currency)}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/5">
            <span className="text-white/40 text-[10px] font-bold uppercase block mb-1">Billable Hrs / Mo</span>
            <div className="text-lg font-bold">{results.effectiveMonthlyBillableHours.toFixed(1)} hrs</div>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/5">
            <span className="text-white/40 text-[10px] font-bold uppercase block mb-1">Tax Provision</span>
            <div className="text-lg font-bold">{formatCurrency(results.monthlyTaxAmount, inputs.currency)}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/5">
            <span className="text-white/40 text-[10px] font-bold uppercase block mb-1">Fixed Expenses</span>
            <div className="text-lg font-bold">{formatCurrency(results.monthlyExpenses, inputs.currency)}</div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 mt-auto">
        <button 
          onClick={handleCopy}
          className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
            copied 
            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
            : 'bg-white text-slate-900 hover:bg-slate-100 active:scale-[0.98]'
          }`}
        >
          {copied ? '✓ Copied Summary' : 'Copy Results Summary'}
        </button>
        <p className="text-center text-[10px] text-white/30 font-bold uppercase tracking-widest mt-4">
          Rates rounded up to nearest {formatCurrency(5, inputs.currency)} for professional positioning.
        </p>
      </div>
    </div>
  );
};
