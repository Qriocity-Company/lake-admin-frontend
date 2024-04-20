import React,{useEffect, useState,useContext} from 'react'

import {  useNavigate } from 'react-router-dom';
import '../styles/login.css'
// import HostContext from '../context/HostContext';
const Login = () => {
   
    // const {host} = useContext(HostContext);
    const host="http://localhost:3001"
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const navigate = useNavigate();
    

    const handleSubmit=async(e)=>{

        e.preventDefault();

        const response = await fetch(`${host}/auth/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email,password})
        })
        const data = await response.json();
        console.log(data)

        if(!data.success){
            alert(data.error);
            return;
        }
        
        localStorage.setItem('user',JSON.stringify(data.user));


        setEmail('');
        setPassword('');

        navigate('/home')
    }

    useEffect(()=>{
        if(localStorage.getItem('user')){
            navigate('/home');
        }
    },[])

  return (
    <div className='bg-blue-600 h-[100vh] w-[100vw] flex items-center justify-center'>
        <div className="container w-[25vw]">
        <div className="heading">Sign In</div>
        <h2 className='text-zinc-400 text-center text-lg'>Sign in to manage your website.</h2>
        <form onSubmit={handleSubmit} className="form">
            <input 
            required 
            className="input" 
            type="email" 
            name="email" 
            id="email" 
            placeholder="E-mail" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
            required 
            className="input" 
            type="password" 
            name="password" 
            id="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            />
            {/* <span className="forgot-password"><a href="#">Forgot Password ?</a></span> */}
            <input className="login-button" type="submit" value="Sign In" />
        </form>
        <span className="agreement"><a href="#">Learn user licence agreement</a></span>
        </div>
    </div>
  )
}

export default Login