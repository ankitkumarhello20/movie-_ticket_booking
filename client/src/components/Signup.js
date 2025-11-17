import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const history = useHistory();
  const base = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${base}/auth/signup`, {method:'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({email,password,name})});
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        history.push('/movies');
      } else {
        alert('Signup failed');
      }
    } catch (e) {
      alert('Error');
    }
  }

  return (
    <div style={{padding:20}}>
      <h2>Sign up</h2>
      <form onSubmit={submit}>
        <div><input placeholder="name" value={name} onChange={e=>setName(e.target.value)} /></div>
        <div><input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div><input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <div><button type="submit">Sign up</button></div>
      </form>
    </div>
  )
}

export default Signup;
