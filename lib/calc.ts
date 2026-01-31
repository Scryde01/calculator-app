
import { CalculatorInputs, CalculationResults } from '../types';

/**
 * Rounds a number to the nearest 5 (usually preferred for professional rates)
 */
export const roundToProfessional = (num: number): number => {
  return Math.ceil(num / 5) * 5;
};

export const calculateRates = (inputs: CalculatorInputs): CalculationResults => {
  const {
    targetMonthlyIncome,
    workingDaysPerMonth,
    billableHoursPerDay,
    utilizationPercent,
    expensesPerMonth,
    taxPercent,
  } = inputs;

  // 1. Total monthly required (net profit + expenses)
  const monthlyRequiredNet = targetMonthlyIncome + expensesPerMonth;

  // 2. Gross up for tax
  // target = gross * (1 - taxRate) -> gross = target / (1 - taxRate)
  const taxRate = taxPercent / 100;
  const monthlyRequiredGross = taxRate >= 1 ? monthlyRequiredNet : monthlyRequiredNet / (1 - taxRate);

  // 3. Calculate effective billable hours
  // accounts for utilization (admin, marketing, sick days)
  const totalPossibleHours = workingDaysPerMonth * billableHoursPerDay;
  const effectiveMonthlyBillableHours = totalPossibleHours * (utilizationPercent / 100);

  // 4. Calculate Rates
  // Avoid division by zero
  const hourlyRateRaw = effectiveMonthlyBillableHours > 0 
    ? monthlyRequiredGross / effectiveMonthlyBillableHours 
    : 0;
  
  const hourlyRate = roundToProfessional(hourlyRateRaw);
  const dayRate = roundToProfessional(hourlyRate * billableHoursPerDay);

  return {
    hourlyRate,
    dayRate,
    monthlyRequiredGross,
    effectiveMonthlyBillableHours,
    monthlyExpenses: expensesPerMonth,
    monthlyTaxAmount: monthlyRequiredGross - monthlyRequiredNet,
    suggestedRetainer: monthlyRequiredGross
  };
};
