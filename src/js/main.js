let chart;
// Make functions globally accessible for split view
window.updateTotals = function() {
	const incomeFields = [
		'income-january','income-february','income-march','income-april','income-may','income-june',
		'income-july','income-august','income-september','income-october','income-november','income-december'
	];
	const expensesFields = [
		'expenses-january','expenses-february','expenses-march','expenses-april','expenses-may','expenses-june',
		'expenses-july','expenses-august','expenses-september','expenses-october','expenses-november','expenses-december'
	];
	
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
	document.getElementById('total-income').textContent = totalIncome.toFixed(2);
	document.getElementById('total-expenses').textContent = totalExpenses.toFixed(2);
	window.updateChart();
};

window.updateChart = function() {
	const incomeFields = [
		'income-january','income-february','income-march','income-april','income-may','income-june',
		'income-july','income-august','income-september','income-october','income-november','income-december'
	];
	const expensesFields = [
		'expenses-january','expenses-february','expenses-march','expenses-april','expenses-may','expenses-june',
		'expenses-july','expenses-august','expenses-september','expenses-october','expenses-november','expenses-december'
	];
	const monthLabels = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	
	const incomeData = incomeFields.map(id => parseFloat(document.getElementById(id)?.value) || 0);
	const expensesData = expensesFields.map(id => parseFloat(document.getElementById(id)?.value) || 0);
	const ctx = document.getElementById('incomeExpensesChart');
	if (!ctx) return;
	// If chart exists but canvas was replaced, destroy and recreate
	if (chart && chart.canvas !== ctx) {
		chart.destroy();
		chart = null;
	}
	if (!chart) {
		chart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: monthLabels,
				datasets: [
					{
						label: 'Income',
						data: incomeData,
						backgroundColor: 'rgb(40, 167, 69)',
						borderColor: 'rgba(40, 167, 69, 1)',
						borderWidth: 1
					},
					{
						label: 'Expenses',
						data: expensesData,
						backgroundColor: 'rgb(220, 53, 69)',
						borderColor: 'rgba(220, 53, 69, 1)',
						borderWidth: 1
					}
				]
			},
			options: {
				responsive: true,
				plugins: {
					legend: { position: 'top' },
					title: { display: false }
				},
				scales: {
					x: {
						stacked: false,
						grid: { color: '#fff' }
					},
					y: {
						beginAtZero: true,
						grid: { color: '#fff' }
					}
				}
			}
		});
		window.chart = chart;
	} else {
		chart.data.datasets[0].data = incomeData;
		chart.data.datasets[1].data = expensesData;
		chart.update();
	}
};

document.addEventListener('DOMContentLoaded', function () {
	// Add event listeners to tab view inputs for totals
	const months = ['january','february','march','april','may','june','july','august','september','october','november','december'];
	months.forEach(month => {
		const incomeInput = document.getElementById(`income-${month}`);
		const expensesInput = document.getElementById(`expenses-${month}`);
		if (incomeInput) incomeInput.addEventListener('input', window.updateTotals);
		if (expensesInput) expensesInput.addEventListener('input', window.updateTotals);
	});
	const incomeFields = [
		'income-january','income-february','income-march','income-april','income-may','income-june',
		'income-july','income-august','income-september','income-october','november','income-december'
	];
	const expensesFields = [
		'expenses-january','expenses-february','expenses-march','expenses-april','expenses-may','expenses-june',
		'expenses-july','expenses-august','expenses-september','expenses-october','expenses-november','expenses-december'
	];
	// Initialize chart if chart tab is visible on load
	if (document.getElementById('chart').classList.contains('show')) {
		setTimeout(window.updateChart, 100);
	}

	// Also initialize chart when chart tab is activated
	const chartTabBtn = document.getElementById('chart-tab');
	if (chartTabBtn) {
		chartTabBtn.addEventListener('shown.bs.tab', function () {
			setTimeout(window.updateChart, 100);
		});
	}
});

