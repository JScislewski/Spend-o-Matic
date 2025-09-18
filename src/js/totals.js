// Totals calculation logic for Spend-o-Matic
export function calculateTotals(incomeFields, expensesFields) {
    let totalIncome = 0;
    let totalExpenses = 0;
    incomeFields.forEach(id => {
        const val = parseFloat(document.getElementById(id)?.value) || 0;
        totalIncome += val;
    });
    expensesFields.forEach(id => {
        const val = parseFloat(document.getElementById(id)?.value) || 0;
        totalExpenses += val;
    });
    return { totalIncome, totalExpenses };
}
