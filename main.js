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

    // Limit the number of data points displayed (e.g., show the last 20 points)
    const maxDataPoints = 20;
    if (minuteChart.data.labels.length > maxDataPoints) {
        minuteChart.data.labels.shift();
        minuteChart.data.datasets[0].data.shift();
    }

    // Update the chart
    minuteChart.update();
}

// Function to fetch 1-minute chart data
async function fetchMinuteChartData() {
    try {
        const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbolToRetrieve}&interval=1m&limit=1`);
        const data = await response.json();

        // Extract the relevant data from the response
        const price = parseFloat(data[0][4]); // Closing price
        const timestamp = new Date(data[0][6]); // Timestamp

        // Update the chart
        updateMinuteChart(price, timestamp.toLocaleTimeString());
    } catch (error) {
        console.error('Error fetching 1-minute chart data:', error);
    }
}

// Fetch crypto data and update the chart initially and at regular intervals
fetchStockData();
fetchMinuteChartData();
setInterval(fetchStockData, 5000); // Update stock data every 5 seconds (adjust as needed)
setInterval(fetchMinuteChartData, 60000); // Update minute chart data every 1 minute (adjust as needed)
