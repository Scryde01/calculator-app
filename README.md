
# Freelance Rate Calculator (MVP)

## 1. Product Spec
**What it does:** A specialized calculator that helps freelancers convert their desired *net* monthly income into professional hourly and day rates.
**Who it's for:** Independent contractors, consultants, and creative freelancers who often undercharge because they forget to factor in non-billable time, taxes, and overhead.
**Why it matters:** Most freelancers calculate rates by dividing income by total working hours. This tool forces them to consider "Utilization" (non-billable time) and "Tax Gross-up", leading to sustainable pricing.

## 2. Calculation Logic
1.  **Monthly Required (Net)** = `Target Income + Monthly Expenses`
2.  **Monthly Required (Gross)** = `Monthly Required (Net) / (1 - (Tax Rate / 100))`
3.  **Potential Hours** = `Working Days * Max Billable Hours`
4.  **Effective Billable Hours** = `Potential Hours * (Utilization % / 100)`
5.  **Hourly Rate (Raw)** = `Monthly Required (Gross) / Effective Billable Hours`
6.  **Hourly Rate (Professional)** = `RoundUpToNearest5(Hourly Rate Raw)`
7.  **Day Rate** = `Hourly Rate (Professional) * Max Billable Hours`

## 3. Edge Cases & Validation
- **Zero Billable Hours:** Prevents division by zero (returns $0 rates).
- **100% Tax:** Handled as a non-attainable goal (caps or handles division).
- **Negative Inputs:** Input handlers restrict values to `Math.max(0, value)`.
- **Rounding:** Always rounds *up* to the nearest 5 to ensure profit margins are preserved.

## 4. Folder Tree
```text
.
├── components/
│   ├── CalculatorForm.tsx  # Input management
│   ├── Header.tsx          # Branding
│   ├── ResultsPanel.tsx    # Output & Copy feature
├── lib/
│   ├── calc.ts            # Mathematical core
│   ├── format.ts          # Currency/String formatting
├── App.tsx                 # Root State & Storage
├── types.ts                # TypeScript interfaces
├── index.tsx               # Entry point
└── index.html              # HTML shell
```

## 5. Test Checklist (Manual QA)
- [ ] **Instant Update:** Change 'Target Monthly Income' to 10,000. Do rates update immediately?
- [ ] **Persistence:** Refresh the page. Are the inputs still there?
- [ ] **Reset:** Click 'Reset All'. Do values return to defaults?
- [ ] **Validation:** Try entering '-100' for expenses. Does it correct to '0'?
- [ ] **Copy:** Click 'Copy Results'. Paste into a text editor. Is the summary formatted correctly?
- [ ] **Responsive:** Shrink screen to mobile. Does the layout stack correctly?
