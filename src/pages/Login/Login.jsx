import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Login.css'

const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('');
    const navigate=useNavigate();


    const handleLogin=async(e)=>{
        e.preventDefault();

        try {
            const response=await axios.post('http://localhost:5000/auth/login',{
                email,
                password,
            });

            const {token,userId}=response.data;

            if(token){
                // Save token in localstorage
                localStorage.setItem('token',token);
                localStorage.setItem('userId', userId);  // Store userId here


                // Redirect to customer dashboard
                navigate('/customer');
            }
            else{
                setError('Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Login failed. Please check your credentials and try again.');
        }
    }

  return (
    <div className='login-container'>
      
      <h1>Login</h1>
      {error && <p className='error-message'>{error}</p>}

      <form onSubmit={handleLogin}>
        <div style={{marginBottom:'15px'}}>
            <label htmlFor="email">Email: </label>
            <input type="email" id='email' value={email} onChange={(e)=>setEmail(e.target.value)} style={{width:'100%',padding:'8px',marginTop:'5px'}} required />
        </div>

        <div style={{marginBottom:'15px'}}>
            <label htmlFor="password">Password: </label>
            <input type="password" id='password' value={password} onChange={(e)=>setPassword(e.target.value)} style={{width:'100%',padding:'8px',marginTop:'5px'}} required />
        </div>

    
        <button type='submit' style={{width:'100%',padding:'10px',backgroundColor:'#4CAF50', color:'#fff' ,border:'none',borderRadius:'5px'}}>Login</button>
        
      </form>
    </div>
  )
}

export default Login;
