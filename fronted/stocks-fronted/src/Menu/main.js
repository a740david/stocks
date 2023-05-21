import './App.css';
import Layout from './Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import Stock_Report from '../Reports/GrowthCompanies';


function Main() {
  return (

      <Routes>
        <Route path="/" element={<Stock_Report />}>
        
        </Route>
      </Routes>
  )
}

export default Main;