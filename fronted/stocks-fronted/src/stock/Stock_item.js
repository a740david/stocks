import React, { useContext } from 'react';
import { StocksContext } from './StocksContext';


function Stock_Item() {
  const {stockData}=useContext(StocksContext)
  return (
    
    <div>
       <h1 >{stockData.name}</h1>
    </div>
      );
    };

export default Stock_Item;