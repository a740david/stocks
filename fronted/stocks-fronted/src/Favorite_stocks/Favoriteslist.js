import React, { useContext, useState } from 'react';
import axios from 'axios';
import { StocksContext } from '../stock/StocksContext';


const StockFavorite = () => {
  const {stockData}=useContext(StocksContext)
  const [isFavorite, setIsFavorite] = useState(stockData.is_favorite);
  

  const handleFavoriteClick = () => {
    const method = isFavorite ? 'DELETE' : 'POST';
    const url = `http://127.0.0.1:8000/api/favorite-stocks/${stockData.symbol}/`;

    axios({
      method: method,
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        setIsFavorite(!isFavorite);
      })
      .catch(error => {
        console.error('Failed to update favorites', error);
      });
  };

  return (
    <div>
      {/* Render the star icon based on the isFavorite state */}
      <span onClick={handleFavoriteClick}>
        {isFavorite ? '★' : '☆'}
      </span>
    </div>
  );
};

export default StockFavorite;
