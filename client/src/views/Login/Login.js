import React, { useState } from 'react'
import "./Login.css"
import { Link } from 'react-router-dom'
import axios from "axios"
import toast, {Toaster} from "react-hot-toast"
import gmail from "./email.png"
import lock from './hidden.png'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginNow = async () => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/login` , {
      email: email,
      password: password
    })
    if(response.data.success){
      toast.success(response.data.message)

      localStorage.setItem('currentUser', JSON.stringify(response.data.data))

      toast.loading("Redirecting to dashboard....")

      setTimeout(() => {
         window.location.href = '/'},
         3000)
    }
    else{
      toast.error(response.data.message)
    }
  }


  return (
    <div>
      <h1 className='auth-heading'>User Login</h1>

      <form className='auth-form'>
      <label>
          <img src={gmail } alt='email' className='field-icon' />
        </label>
        <input
          type='email'
          placeholder='Email'
          className='user-input'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

<label>
          <img src={lock} alt='password' className='field-icon' />
        </label>
        <input
          type='password'
          placeholder='Password'
          className='user-input'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type='button'
          className='btn-auth'
          onClick={loginNow}>
          Login
        </button>

      </form>

      <Link to='/signup' className='auth-link'>Don't have an account? Signup</Link>

      <Toaster />
    </div>
  )
}

export default Login