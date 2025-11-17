import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const base = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${base}/auth/login`, {method:'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({email,password})});
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        history.push('/movies');
      } else {
        alert('Login failed');
      }
    } catch (e) {
      alert('Error');
    }
  }

  return (
    <div style={{padding:20}}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div><input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div><input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <div><button type="submit">Login</button></div>
      </form>
    </div>
  )
}

export default Login;
