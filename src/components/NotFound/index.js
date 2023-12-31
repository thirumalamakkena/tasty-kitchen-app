import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="container">
    <img
      alt="not found"
      className="not-found-img"
      src="https://res.cloudinary.com/dpakgiqtz/image/upload/v1701694794/cidhdk79wdxvsjf4ilch.png"
    />
    <h1 className="m-title">Page Not Found</h1>
    <p className="m-description">
      we are sorry, the page you requested could not be found. Please go back to
      homepage.
    </p>
    <Link to="/">
      <button type="button" className="order-now-btn">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
