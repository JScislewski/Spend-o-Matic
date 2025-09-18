// Chart logic for Spend-o-Matic
export function updateChart(chart, incomeData, expensesData, monthLabels) {
    if (!chart) return;
    chart.data.datasets[0].data = incomeData;
    chart.data.datasets[1].data = expensesData;
    chart.update();
}

export function createChart(ctx, monthLabels, incomeData, expensesData) {
    return new Chart(ctx, {
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
}
