import React from 'react'
import loginStyles from './login.module.scss'

function Login() {

  return (
    <div className={loginStyles.content}>
      <h1>Login</h1>
      <a href="http://localhost:3000/auth/facebook">
        <button className={loginStyles.facebookBtn}>FACEBOOK LOGIN</button>
      </a>
    </div>
  )
}

export default Login
