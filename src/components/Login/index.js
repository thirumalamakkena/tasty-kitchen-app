import {Component} from 'react'
import './index.css'

class Login extends Component {
  render() {
    return (
      <div className="login-app-container">
        <div className="login-card-container">
          <div className="login-card">
            <img
              alt="logo"
              className="login-logo"
              src="https://res.cloudinary.com/dpakgiqtz/image/upload/v1694184061/brdrwznmkjewrdnn4iyq.png"
            />
            <h1 className="login-app-name">Tasty Kitchens</h1>
            <h1 className="login-name">Login</h1>
            <label htmlFor="Username" className="label">
              USERNAME
            </label>
            <input
              id="Username"
              className="login-input"
              placeholder="Username"
              type="text"
            />
            <label htmlFor="Password" className="label" type="password">
              PASSWORD
            </label>
            <input
              id="Password"
              className="login-input"
              placeholder="Password"
            />
            <button type="submit" className="login-btn">
              Login
            </button>
          </div>
        </div>
        <div className="login-bg-image-container">
          <img
            alt="login imag"
            className="login-side-img"
            src="https://res.cloudinary.com/dpakgiqtz/image/upload/v1694194874/xphzpyqrqhbfyohevtsb.png"
          />
        </div>
      </div>
    )
  }
}

export default Login
