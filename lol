<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stock Trading Platform</title>
    <style>
        /* Add your styles here */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        header {
            background-color: #333;
            padding: 10px;
            color: white;
            text-align: center;
        }
        main {
            margin: 20px;
        }
        #stockData {
            border-collapse: collapse;
            width: 100%;
        }
        #stockData th, #stockData td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        #stockData th {
            background-color: #4CAF50;
            color: white;
        }
    </style>
</head>
<body>
    <header>
        <h1>Stock Trading Platform</h1>
    </header>
    <main>
        <table id="stockData">
            <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Change</th>
                    <th>Change (%)</th>
                </tr>
            </thead>
            <tbody id="stockTableBody">
                <!-- Stock data will be displayed here -->
            </tbody>
        </table>
    </main>
    <script>
        // Replace with your API endpoint or use a library to fetch data
        const apiUrl = 'https://api.example.com/stocks';

        // Fetch stock data from the API
        async function fetchStockData() {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                // Update the stock table with the received data
                updateStockTable(data);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        }

        // Update the stock table with the latest data
        function updateStockTable(data) {
            const stockTableBody = document.getElementById('stockTableBody');
            stockTableBody.innerHTML = '';

            data.forEach(stock => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${stock.symbol}</td>
                    <td>${stock.name}</td>
                    <td>${stock.price}</td>
                    <td>${stock.change}</td>
                    <td>${stock.changePercentage}%</td>
                `;
                stockTableBody.appendChild(row);
            });
        }

        // Fetch stock data initially and set an interval for periodic updates
        fetchStockData();
        setInterval(fetchStockData, 5000); // Update every 5 seconds (adjust as needed)
    </script>
</body>
</html>
