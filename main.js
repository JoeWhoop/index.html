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

// Function to calculate the expected price change for the next day
function calculateExpectedPriceChange(data) {
    const lastPrice = parseFloat(data[data.length - 1][4]); // Closing price of the last minute
    const firstPrice = parseFloat(data[0][4]); // Closing price of the first minute

    // Calculate the average price change per minute
    const averageChange = (lastPrice - firstPrice) / data.length;

    // Assuming 24 hours in a day, calculate the expected price change for the next day
    const expectedPriceChange = averageChange * 24 * 60; // Convert to minutes

    // Calculate the expected price
    const expectedPrice = lastPrice + expectedPriceChange;

    return expectedPrice;
}

// Function to fetch 1-day expected chart data
async function fetchExpectedPriceData() {
    try {
        const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbolToRetrieve}&interval=1m&limit=1440`);
        const data = await response.json();

        // Calculate the expected price for the next day
        const expectedPrice = calculateExpectedPriceChange(data);

        // Update the HTML with the expected price
        document.getElementById('expectedPrice').innerText = `$${expectedPrice.toFixed(2)}`;
    } catch (error) {
        console.error('Error fetching 1-day expected price data:', error);
    }
}

// Function to fetch crypto data and update the chart
async function fetchCryptoData() {
    try {
        const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbolToRetrieve}`);
        const data = await response.json();

        // Extract relevant data
        const price = parseFloat(data.lastPrice);
        const priceChange = parseFloat(data.priceChange);
        const priceChangePercent = parseFloat(data.priceChangePercent);

        // Update the HTML with the crypto data
        document.getElementById('cryptoPrice').innerText = `$${price.toFixed(2)}`;
        document.getElementById('priceChange').innerText = `$${priceChange.toFixed(2)}`;
        document.getElementById('percentChange').innerText = `${priceChangePercent.toFixed(2)}%`;

        // Update the 1-minute chart
        updateMinuteChart(price, new Date().toLocaleTimeString());
    } catch (error) {
        console.error('Error fetching crypto data:', error);
    }
}

// Fetch crypto data, update the chart, and calculate the expected price initially and at regular intervals
fetchCryptoData();
fetchExpectedPriceData();
setInterval(fetchCryptoData, 5000); // Update crypto data every 5 seconds (adjust as needed)
setInterval(fetchExpectedPriceData, 60000); // Calculate expected price every 1 minute (adjust as needed)
