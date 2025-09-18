import { saveData, loadData } from './persistence.js';
import { updateChart, createChart } from './chart.js';
import { calculateTotals } from './totals.js';

let chart;
const incomeFields = [
	'income-january','income-february','income-march','income-april','income-may','income-june',
	'income-july','income-august','income-september','income-october','income-november','income-december'
];
const expensesFields = [
	'expenses-january','expenses-february','expenses-march','expenses-april','expenses-may','expenses-june',
	'expenses-july','expenses-august','expenses-september','expenses-october','expenses-november','expenses-december'
];
const monthLabels = ['January','February','March','April','May','June','July','August','September','October','November','December'];

window.updateTotals = function() {
	const totals = calculateTotals(incomeFields, expensesFields);
	document.getElementById('total-income').textContent = totals.totalIncome.toFixed(2);
	document.getElementById('total-expenses').textContent = totals.totalExpenses.toFixed(2);
	window.updateChart();
};

window.updateChart = function() {
	const incomeData = incomeFields.map(id => parseFloat(document.getElementById(id)?.value) || 0);
	const expensesData = expensesFields.map(id => parseFloat(document.getElementById(id)?.value) || 0);
	const ctx = document.getElementById('incomeExpensesChart');
	if (!ctx) return;
	if (chart && chart.canvas !== ctx) {
		chart.destroy();
		chart = null;
	}
	if (!chart) {
		chart = createChart(ctx, monthLabels, incomeData, expensesData);
		window.chart = chart;
	} else {
		updateChart(chart, incomeData, expensesData, monthLabels);
	}
};

document.addEventListener('DOMContentLoaded', function () {
	incomeFields.forEach(id => {
		const input = document.getElementById(id);
		if (input) {
			input.addEventListener('input', () => {
				window.updateTotals();
				saveData();
			});
		}
	});
	expensesFields.forEach(id => {
		const input = document.getElementById(id);
		if (input) {
			input.addEventListener('input', () => {
				window.updateTotals();
				saveData();
			});
		}
	});
	loadData();

	if (document.getElementById('chart').classList.contains('show')) {
		setTimeout(window.updateChart, 100);
	}
	const chartTabBtn = document.getElementById('chart-tab');
	if (chartTabBtn) {
		chartTabBtn.addEventListener('shown.bs.tab', function () {
			setTimeout(window.updateChart, 100);
		});
	}
});

