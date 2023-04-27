import { useState } from 'react';
import axios from 'axios';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

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
      const token = response.data.access;
      // store token in local storage
      localStorage.setItem('token', token);

      // redirect to home page or protected dashboard page
    } catch (error) {
      console.log(error);
      // show error message to user
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <input type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <button type="submit">Sign up</button>
    </form>
  );
}
