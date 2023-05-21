
import './App.css';
// import Singup from './user/Singup'
import Login from './user/Login';
import { BrowserRouter, Route,Routes } from "react-router-dom";
import SignupForm from './user/Singup';
function App() {
  return (  
    <BrowserRouter>
     <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path='/signup' element={<SignupForm/>} ></Route> 
      </Routes>
      </BrowserRouter>
  );
}

export default App;
