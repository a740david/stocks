import React, { useState } from 'react';
import axios from 'axios';

function LogoutButton({ onLogout }) {
  const [symbols, setSymbol] = useState('');
  const [stockData, setStockData] = useState(null);

  const handleSymbolChange = (event) => {
    setSymbol(event.target.value);
  };

  const handleSearch = () => {
    fetch(`http://127.0.0.1:8000/api/stock/${symbols}`)
      .then((response) => response.json())
      .then((data) => {
        setStockData(data);
      })
      .catch((error) => {
        console.error('Error fetching stock data:', error);
      });
  };

  return (
    <div>
      <input type="text" value={symbols} onChange={handleSymbolChange} />
      <button onClick={handleSearch}>Search</button>

      {stockData && (
        <div>
          <h2>{stockData.name}</h2>
          <p>Symbol: {stockData.symbol}</p>
          <p>Price: {stockData.price}</p>
          <p>P/E_ratio: {stockData.pe_ratio}</p>
          <p>mkt_cap: {stockData.mkt_cap}</p>
        </div>
      )}
      <button onClick={onLogout}>Logout</button>
    </div>
      );
    };


 



export default LogoutButton;


