import React, { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Button } from '@mui/material';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('access_token');
    const storedRefreshToken = localStorage.getItem('refresh_token');
    if (storedAccessToken && storedRefreshToken) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
    }
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/token/', {
        username: username,
        password: password,
      });
      const { access, refresh } = response.data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      setAccessToken(access);
      setRefreshToken(refresh);
      // Redirect to the home page or dashboard here
    } catch (error) {
      console.error(error);
      // Handle login error here
      
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setAccessToken('');
    setRefreshToken('');
    // Redirect to the login page here
  };

  const isLoggedIn = () => {
    return accessToken !== '';
  };

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      axios.post('http://127.0.0.1:8000/api/auth/token/refresh/', {
        refresh: refreshToken,
      }).then((response) => {
        const { access } = response.data;
        localStorage.setItem('access_token', access);
        setAccessToken(access);
      }).catch((error) => {
        console.error(error);
        // Handle refresh error here
      });
    }, 15 * 60 * 1000); // Refresh token every 15 minutes
    return () => clearInterval(refreshInterval);
  }, [refreshToken]);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/auth/me/', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    }).then((response) => {
      setUserData(response.data);
    }).catch((error) => {
      console.error(error);
      // Handle get me error here
    });
  }, [accessToken]);

  return (
    <div>
      {isLoggedIn() ? (
        <div>
          <p>You are logged in as {userData.username}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        
        <form  onSubmit={handleLogin}>
          <label>
            <TextField 
              variant="outlined"
              margin="normal"
              required
              id="username"
              label="Username"
              name="username"
              autoFocus value={username} onChange={handleUsernameChange} />
          </label>
          <br/>
          <label>
            <TextField 
              variant="outlined"
              margin="normal"
              required
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"  value={password} onChange={handlePasswordChange} />
          </label>
          <br/>
          <Button  type="submit"
              variant="contained"
              color="primary" >Login</Button>
        </form>
      )}
    </div>
  );
}

export default Login;
