// Handles saving and loading of income/expenses data using localStorage
const months = ['january','february','march','april','may','june','july','august','september','october','november','december'];

export function saveData(prefix = '') {
    const data = {};
    months.forEach(month => {
        data[`${prefix}income-${month}`] = document.getElementById(`${prefix}income-${month}`)?.value || '';
        data[`${prefix}expenses-${month}`] = document.getElementById(`${prefix}expenses-${month}`)?.value || '';
    });
    localStorage.setItem(`spendomatic-data${prefix ? '-' + prefix : ''}`, JSON.stringify(data));
}

export function loadData(prefix = '') {
    const data = JSON.parse(localStorage.getItem(`spendomatic-data${prefix ? '-' + prefix : ''}`) || '{}');
    months.forEach(month => {
        if (data[`${prefix}income-${month}`] !== undefined) {
            document.getElementById(`${prefix}income-${month}`)?.setAttribute('value', data[`${prefix}income-${month}`]);
            document.getElementById(`${prefix}income-${month}`)?.dispatchEvent(new Event('input'));
        }
        if (data[`${prefix}expenses-${month}`] !== undefined) {
            document.getElementById(`${prefix}expenses-${month}`)?.setAttribute('value', data[`${prefix}expenses-${month}`]);
            document.getElementById(`${prefix}expenses-${month}`)?.dispatchEvent(new Event('input'));
        }
    });
}
