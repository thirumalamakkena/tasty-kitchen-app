import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  onSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 1, path: '/'})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/login'

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessLogin(data.jwt_token)
      this.setState({showError: false, username: '', password: ''})
    } else {
      this.setState({
        showError: true,
        errorMsg: data.error_msg,
        username: '',
        password: '',
      })
    }
  }

  onChangeUsername = event => this.setState({username: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  render() {
    const {username, password, showError, errorMsg} = this.state

    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-app-container">
        <div className="login-card-container">
          <form className="login-card" onSubmit={this.onSubmitLogin}>
            <img
              alt="responsive bg"
              className="responsive-img"
              src="https://res.cloudinary.com/dpakgiqtz/image/upload/v1694239044/ips0yhhfyfrioceq4cmf.png"
            />
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
              value={username}
              onChange={this.onChangeUsername}
            />
            <label htmlFor="Password" className="label" type="password">
              PASSWORD
            </label>
            <input
              id="Password"
              type="password"
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={this.onChangePassword}
            />
            <button type="submit" className="login-btn">
              Login
            </button>
            {showError && <p className="error-msg">*{errorMsg}</p>}
          </form>
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
