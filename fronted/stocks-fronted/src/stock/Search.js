import React, { useState } from 'react';
import axios from 'axios';
import {Button,IconButton,Grid, TextField, InputAdornment} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import StockFavorite from '../Favorite_stocks/Favoriteslist';
import Stock_Item from './Stock_item';
import { StocksContext } from './StocksContext';

function LogoutButton({ onLogout }) {
  const [symbols, setSymbol] = useState('');
  const [stockDataList, setStockDataList] = useState([]);

  
  const handleSymbolChange = (event) => {
    setSymbol(event.target.value);
  };

  const handleSearch = () => {
   
    axios.get(`http://127.0.0.1:8000/api/stock/${symbols}`)
      .then((response) => {
        const data=response.data
        setStockDataList((prevStockDataList) => [
            ...prevStockDataList,
            data
        ]);
      })

      .catch((error) => {
        console.error('Error fetching stock data:', error);
      });
  };

  const handleClearSearch = () => {
    setSymbol('')
  };
  return (
    
    <div style={{  backgroundColor: '#ababab', minHeight: '100vh', padding: '20px'  }}>
     <Grid align='center'>
      <TextField 
      value={symbols}   
      onChange={handleSymbolChange} 
     placeholder='Search Stocks'
      InputProps={{
         startAdornment: (
            <InputAdornment position="start">
            <IconButton onClick={handleSearch} edge="end">
              <SearchIcon />
            </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClearSearch} edge="end">
                  <ClearIcon/>
                </IconButton>
              </InputAdornment>
            ),
      }}
            sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'yellow',
                borderWidth: '4px'
              },
              '&:hover fieldset': {
                borderColor: 'yellow',
                borderWidth: '4px'
              },
              '&.Mui-focused fieldset': {
                borderColor: 'yellow',
                borderWidth: '4px'
              },
              borderRadius: '18px', // Adjust the border radius to make it rounder
              backgroundColor: 'white',
    
            },
        }}
      />
     

      {stockDataList.map((stockData, index) => (
        <div key={index}>
        <StocksContext.Provider value={{stockData}}>
          <Stock_Item />
          <StockFavorite />
          
        </StocksContext.Provider>
        </div>
        ))}
        </Grid>
      <button onClick={onLogout}>Logout</button>
    </div>
      );
    };

export default LogoutButton;