import React, { useState, useEffect } from 'react';
import {  Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import axios from 'axios';
import {Grid,Stack, Button, Paper, Avatar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Search from  '../stock/Search';


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
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
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
    delete axios.defaults.headers.common['Authorization'];
  };

  const isLoggedIn = () => {
    return accessToken !== '' && accessToken !== null;
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

  // style
  const paperStyle={padding:20,height:'70vh',width:300,margin:'20px auto'}
  const theme = createTheme({
    palette: {
      primary: {
        main: '#FFEB3B', // Yellow color
      },
    },
  });
  
  const themeA = createTheme({
    components: {
      MuiAvatar: {
        styleOverrides: {
          colorDefault: {
            backgroundColor: '#FFEB3B', // Yellow color
          },
        },
      },
    },
  });
  return (
    <div>
      {isLoggedIn() ? (
        <div>
          <Search onLogout={handleLogout} /> 
        </div>
      ) : (
        <Grid>
        <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
        <ThemeProvider theme={themeA}>
        <Avatar >
            <LockOutlinedIcon />
          </Avatar>
          </ThemeProvider>
        <h2>Login</h2>
        </Grid>
        <Stack  direction="row" justifyContent="center">
        <form  onSubmit={handleLogin}>
           <TextField 
              variant="outlined"
              margin="normal"
              fullWidth
              required
              id="username"
              label="Username"
              name="username"
              autoFocus value={username} 
              onChange={handleUsernameChange} 
              sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'yellow',
              },
              '&:hover fieldset': {
                borderColor: 'yellow',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'yellow',
              },
            },
        }}
              />
         
          <br/>
            <TextField 
              variant="outlined"
              margin="normal"
              fullWidth
              required
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"  value={password} onChange={handlePasswordChange} 
              sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'yellow',
              },
              '&:hover fieldset': {
                borderColor: 'yellow',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'yellow',
              },
            },
        }}
              />
         
          <br/>
          <ThemeProvider theme={theme}>
          <Button fullWidth type="submit"
              variant="contained"
              color="primary" >Login</Button>
           </ThemeProvider>Don't have an account?  <Link to="/signup">signup</Link>
          
        </form>
        </Stack>
        </Paper>
        </Grid>

      )}
    </div>
  );
}

export default Login;     