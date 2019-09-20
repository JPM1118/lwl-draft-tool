import React from 'react'
import loginStyles from './login.module.scss'

function Login() {

  return (
    <div className={loginStyles.content}>
      <h2>Login</h2>
      <a href="http://localhost:3000/auth/facebook">
        <button className={loginStyles.facebookBtn}>FACEBOOK LOGIN</button>
      </a>
      <br />
      <div style={{ margin: '1rem auto' }}>Or</div>
      <a href="http://localhost:3000/auth/google">
        <button className={loginStyles.googleBtn}>GOOGLE LOGIN</button>
      </a>
    </div>
  )
}

export default Login
