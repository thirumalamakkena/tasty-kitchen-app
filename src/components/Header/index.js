import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

class Header extends Component {
  state = {showNavBarMenu: false}

  onShowMenu = () => this.setState({showNavBarMenu: true})

  onHideMenu = () => this.setState({showNavBarMenu: false})

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderNavItems = () => (
    <div className="nav-items-container ">
      <ul className="nav-items-list">
        <Link to="/" className="nav-link">
          <li className="nav-item">Home</li>
        </Link>
        <Link to="/cart" className="nav-link">
          <li className="nav-item">Cart</li>
        </Link>
        <li className="nav-item">
          <button
            type="button"
            className="log-out-btn"
            onClick={this.onClickLogout}
          >
            Logout
          </button>
        </li>
      </ul>

      <button
        className="delete-icon-btn"
        type="button"
        onClick={this.onHideMenu}
      >
        <img
          alt="cross icon"
          className="delete-icon"
          src="https://res.cloudinary.com/dpakgiqtz/image/upload/v1694448930/v8o4vipsr6ynzqr4dgqo.png"
        />
      </button>
    </div>
  )

  renderMenuButton = () => (
    <button type="button" className="menu-btn" onClick={this.onShowMenu}>
      <img
        alt="menu icon"
        className="menu-icon"
        src="https://res.cloudinary.com/dpakgiqtz/image/upload/v1694444086/yl36txscqyzeqjjmanaz.png"
      />
    </button>
  )

  render() {
    const {showNavBarMenu} = this.state
    return (
      <>
        <nav className="nav-bar-bg-container desktop-display-nav">
          <div className="nav-bar-container">
            <div className="nav-web-logo-container">
              <img
                alt="website logo"
                className="header-logo"
                src="https://res.cloudinary.com/dpakgiqtz/image/upload/v1694184061/brdrwznmkjewrdnn4iyq.png"
              />
              <h1 className="header-title">Tasty Kitchens</h1>
            </div>
            {this.renderNavItems()}
          </div>
        </nav>
        <nav className="nav-bar-bg-container mobile-display-nav">
          <div className="nav-bar-container">
            <div className="nav-web-logo-container">
              <img
                alt="website logo"
                className="header-logo"
                src="https://res.cloudinary.com/dpakgiqtz/image/upload/v1694184061/brdrwznmkjewrdnn4iyq.png"
              />
              <h1 className="header-title">Tasty Kitchens</h1>
            </div>
            {this.renderMenuButton()}
          </div>
          {showNavBarMenu && this.renderNavItems()}
        </nav>
      </>
    )
  }
}

export default withRouter(Header)
