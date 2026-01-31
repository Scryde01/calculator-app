
export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  SAR = 'SAR'
}

export interface CalculatorInputs {
  targetMonthlyIncome: number;
  workingDaysPerMonth: number;
  billableHoursPerDay: number;
  utilizationPercent: number;
  expensesPerMonth: number;
  taxPercent: number;
  currency: Currency;
}

export interface CalculationResults {
  hourlyRate: number;
  dayRate: number;
  monthlyRequiredGross: number;
  effectiveMonthlyBillableHours: number;
  monthlyExpenses: number;
  monthlyTaxAmount: number;
  suggestedRetainer: number;
}
