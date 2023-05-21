import React, { useContext, useState } from 'react';
import { StocksContext } from '../stock/StocksContext';

function Stock_Report() {
  const {stockData}=useContext(StocksContext)
  const[reports,setReports]=useState("")
  return (
    
    <div>
       <h1 ></h1>
    </div>
      );
    };

export default Stock_Report;