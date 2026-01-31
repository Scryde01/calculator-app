
import { Currency } from '../types';

export const formatCurrency = (amount: number, currency: Currency): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getCurrencySymbol = (currency: Currency): string => {
  switch (currency) {
    case Currency.EUR: return '€';
    case Currency.SAR: return 'SR';
    case Currency.USD: return '$';
    default: return '$';
  }
};
