import React from 'react'
import '../styles/Welcome.scss'
import Signup from './Signup'
function Welcome() {
  return (
    <div className ="authBackground">
      <div className = "form-box">
        <div className = "button-box">
          <div id="btn">
          <button type="button" className="toggle-btn">Log In</button>
          <button type="button" className="toggle-btn">Register</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome
