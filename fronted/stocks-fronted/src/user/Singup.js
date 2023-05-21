import { useState } from 'react';
import axios from 'axios';
import {Avatar,Paper,Grid,Stack, TextField, Button, Typography } from '@mui/material';
import {  Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/signup/', {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        is_staff: false // can be changed to true if staff signup is allowed
      });
      console.log(response.data)
       // Handle successful signup
       setMessage('Signup successful');
       setMessageColor('green');

      const token = response.data.access;
      // store token in local storage
      localStorage.setItem('token', token);

      // redirect to home page or protected dashboard page
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        // Handle the 400 error specifically
        setMessage('Existing user try another user or Invalid signup data. Please check your input');
      } else {
        // Handle other errors
        setMessage('An error occurred during signup. Please try again later.');
      }
      setMessageColor('red');
    }
  }
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
    <Grid>
        <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
        <ThemeProvider theme={themeA}>
        <Avatar >
            <LockOutlinedIcon />
          </Avatar>
          </ThemeProvider>
        <h2>Singup</h2>
        </Grid>
     <Stack  direction="row" justifyContent="center">
    <form onSubmit={handleSubmit}>
      <TextField label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              name="email"
              type="email"
              id="email"
              autoComplete="current-email" 
              value={email} onChange={(e) => setEmail(e.target.value)} 
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
      <TextField label="Password"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              name="password"
              type="password"
              id="password"
              autoComplete="current-firstName" 
              value={password} onChange={(e) => setPassword(e.target.value)} 
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
      <TextField label="First Name"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              name="firstName"
              type="firstName"
              id="firstName"
              autoComplete="current-firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} 
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
      <TextField label="Last Name"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              name="lastName"
              type="lastName"
              id="lastName"
              autoComplete="current-lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}   sx={{
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
        }} />
        <br/>
        <ThemeProvider theme={theme}>
      <Button  fullWidth type="submit"
              variant="contained"
              color="primary" >Singup</Button></ThemeProvider>
    <Link to="/">login</Link>
    </form>
    </Stack>
    <Stack  direction="row" justifyContent="center">
    {message && <Typography style={{ color: messageColor }}>{message}</Typography>}
    </Stack>
</Paper>
        
        </Grid>
    </div>
  );
}
