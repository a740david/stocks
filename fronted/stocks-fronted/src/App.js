
import './App.css';
// import Singup from './user/Singup'
import Login from './user/Login';
import { Route,Routes } from "react-router-dom";
import Main from './user/Main_user';
import SignupForm from './user/Singup';
function App() {
  return (  
     <Routes>
        <Route path="/" element={<Main />}>
        <Route/>
        <Route index element={<Login/>} /> 
          
          <Route path="singup/" element={<SignupForm/>}>    
        </Route>
        </Route> 
      </Routes>
  );
}

export default App;
