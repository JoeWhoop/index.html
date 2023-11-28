// main.js

// Replace 'YOUR_BINANCE_API_KEY' and 'YOUR_BINANCE_SECRET_KEY' with your Binance API key and secret key
const apiKey = 'YOUR_BINANCE_API_KEY';
const secretKey = 'YOUR_BINANCE_SECRET_KEY';

// Replace 'BTCUSDT' with the symbol of the cryptocurrency you want to retrieve
const symbolToRetrieve = 'BTCUSDT';

// Add a reference to the chart
let minuteChart;

// Function to create the 1-minute chart
function createMinuteChart() {
    const chartCanvas = document.getElementById('minuteChart');

    minuteChart = new Chart(chartCanvas, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'BTC/USDT 1-Minute Chart',
                borderColor: '#FF5733',
                data: [],
            }],
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                },
            },
        },
    });
}

// Function to update the 1-minute chart
function updateMinuteChart(price, time) {
    if (!minuteChart) {
        createMinuteChart();
    }

    // Add data point to the chart
    minuteChart.data.labels.push(time);
    minuteChart.data.datasets[0].data.push(price);

    // Limit the number of data points displayed (e.g., show the
