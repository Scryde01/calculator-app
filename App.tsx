
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultsPanel } from './components/ResultsPanel';
import { CalculatorInputs, CalculationResults, Currency } from './types';
import { calculateRates } from './lib/calc';

const STORAGE_KEY = 'freelance-calc-state';

const DEFAULT_INPUTS: CalculatorInputs = {
  targetMonthlyIncome: 5000,
  workingDaysPerMonth: 20,
  billableHoursPerDay: 6,
  utilizationPercent: 80,
  expensesPerMonth: 500,
  taxPercent: 20,
  currency: Currency.USD
};

export default function App() {
  const [inputs, setInputs] = useState<CalculatorInputs>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_INPUTS;
      }
    }
    return DEFAULT_INPUTS;
  });

  const [results, setResults] = useState<CalculationResults | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inputs));
    const calculated = calculateRates(inputs);
    setResults(calculated);
  }, [inputs]);

  const handleInputChange = (newInputs: Partial<CalculatorInputs>) => {
    setInputs(prev => ({ ...prev, ...newInputs }));
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <section>
            <CalculatorForm 
              inputs={inputs} 
              onInputChange={handleInputChange} 
              onReset={handleReset} 
            />
          </section>
          <section className="lg:sticky lg:top-8">
            <ResultsPanel results={results} inputs={inputs} />
          </section>
        </div>
      </main>
      <footer className="py-6 border-t border-slate-200 text-center text-slate-500 text-sm">
        Built for independent professionals. Precise rate calculations for sustainable business growth.
      </footer>
    </div>
  );
}
