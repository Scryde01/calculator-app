
import React from 'react';
import { CalculatorInputs, Currency } from '../types';
import { getCurrencySymbol } from '../lib/format';

interface Props {
  inputs: CalculatorInputs;
  onInputChange: (updates: Partial<CalculatorInputs>) => void;
  onReset: () => void;
}

export const CalculatorForm: React.FC<Props> = ({ inputs, onInputChange, onReset }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let finalValue: string | number = value;

    if (type === 'number') {
      const numVal = parseFloat(value);
      finalValue = isNaN(numVal) ? 0 : Math.max(0, numVal);
    }

    onInputChange({ [name]: finalValue });
  };

  const inputClass = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-900 font-medium";
  const labelClass = "block text-sm font-semibold text-slate-700 mb-1.5";

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-slate-900">Your Business Goals</h2>
        <button 
          onClick={onReset}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors uppercase tracking-wider"
        >
          Reset All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="col-span-1 md:col-span-2">
          <label className={labelClass}>Currency</label>
          <div className="flex gap-2">
            {Object.values(Currency).map((curr) => (
              <button
                key={curr}
                type="button"
                onClick={() => onInputChange({ currency: curr })}
                className={`flex-1 py-2 px-3 rounded-lg border text-sm font-bold transition-all ${
                  inputs.currency === curr 
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100' 
                  : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-300'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="targetMonthlyIncome" className={labelClass}>
            Target Monthly Profit ({getCurrencySymbol(inputs.currency)})
          </label>
          <input
            id="targetMonthlyIncome"
            name="targetMonthlyIncome"
            type="number"
            value={inputs.targetMonthlyIncome || ''}
            onChange={handleChange}
            className={inputClass}
            placeholder="e.g. 5000"
          />
        </div>

        <div>
          <label htmlFor="expensesPerMonth" className={labelClass}>
            Monthly Expenses ({getCurrencySymbol(inputs.currency)})
          </label>
          <input
            id="expensesPerMonth"
            name="expensesPerMonth"
            type="number"
            value={inputs.expensesPerMonth || ''}
            onChange={handleChange}
            className={inputClass}
            placeholder="Software, rent, etc."
          />
        </div>

        <div>
          <label htmlFor="workingDaysPerMonth" className={labelClass}>Working Days / Month</label>
          <input
            id="workingDaysPerMonth"
            name="workingDaysPerMonth"
            type="number"
            value={inputs.workingDaysPerMonth || ''}
            onChange={handleChange}
            className={inputClass}
            placeholder="e.g. 20"
          />
        </div>

        <div>
          <label htmlFor="billableHoursPerDay" className={labelClass}>Max Billable Hours / Day</label>
          <input
            id="billableHoursPerDay"
            name="billableHoursPerDay"
            type="number"
            value={inputs.billableHoursPerDay || ''}
            onChange={handleChange}
            className={inputClass}
            placeholder="e.g. 6"
          />
        </div>

        <div>
          <label htmlFor="utilizationPercent" className={labelClass}>Utilization %</label>
          <div className="relative">
            <input
              id="utilizationPercent"
              name="utilizationPercent"
              type="number"
              max="100"
              value={inputs.utilizationPercent || ''}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. 80"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
          </div>
          <p className="mt-1.5 text-xs text-slate-400 italic leading-relaxed">
            Remaining {(100 - inputs.utilizationPercent).toFixed(0)}% accounts for marketing, admin, and deep work.
          </p>
        </div>

        <div>
          <label htmlFor="taxPercent" className={labelClass}>Average Tax Rate %</label>
          <div className="relative">
            <input
              id="taxPercent"
              name="taxPercent"
              type="number"
              max="100"
              value={inputs.taxPercent || ''}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. 20"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
