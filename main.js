// main.js

// Replace 'YOUR_BINANCE_API_KEY' and 'YOUR_BINANCE_SECRET_KEY' with your Binance API key and secret key
const apiKey = 'YOUR_BINANCE_API_KEY';
const secretKey = 'YOUR_BINANCE_SECRET_KEY';

// Replace 'BTCUSDT' with the symbol of the cryptocurrency you want to retrieve
const symbolToRetrieve = 'BTCUSDT';

// Fetch crypto data from the Binance API
async function fetchCryptoData() {
    try {
        const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbolToRetrieve}`);
        const data = await response.json();

        // Update the crypto table with the received data
        updateCryptoTable(data);
    } catch (error) {
        console.error('Error fetching crypto data:', error);
    }
}

// Update the crypto table with the latest data
function updateCryptoTable(data) {
    const cryptoTableBody = document.getElementById('cryptoTableBody');
    cryptoTableBody.innerHTML = '';

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${data.symbol}</td>
        <td>${data.lastPrice}</td>
        <td>${data.priceChange}</td>
        <td>${data.priceChangePercent}%</td>
    `;
    cryptoTableBody.appendChild(row);
}

// Fetch crypto data initially and set an interval for periodic updates
fetchCryptoData();
setInterval(fetchCryptoData, 5000); // Update every 5 seconds (adjust as needed)
