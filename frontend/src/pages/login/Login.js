import React from 'react'
import loginStyles from './login.module.scss'

function Login() {

  return (

    <div className={loginStyles.content}>
      <div className={loginStyles.siteDescription}>
        <h2>How's It Work</h2>
        <div>
          <p>Welcome to LWL Draft Tool!</p>
          <p>Use this site to sync your LWL rank spreedsheet with your live, in-person draft. Your team, available players, and your total FSI updates with each new pick.</p>
          <p>All you have to do is login, upload your LWL spreedsheet, install the accompanying chrome extension, then setup a clickydraft.com draft room for your league draft.</p>
        </div>

      </div>
      <hr />
      <h2>Login</h2>
      <a href="https://api.lwldrafttool.com/auth/facebook">
        <button className={loginStyles.facebookBtn}>FACEBOOK LOGIN</button>
      </a>
      <br />
      <div style={{ margin: '1rem auto' }}>Or</div>
      <a href="https://api.lwldrafttool.com/auth/google">
        <button className={loginStyles.googleBtn}>GOOGLE LOGIN</button>
      </a>

    </div>


  )
}

export default Login
