import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="container">
    <img
      alt="not found"
      className="not-found-img"
      src="https://res.cloudinary.com/dpakgiqtz/image/upload/v1697203082/r3skhw8xcl6czziq8ss5.png"
    />
    <h1 className="m-title">Page Not Found</h1>
    <p className="m-description">
      we are sorry, the page you requested could not be found
    </p>
    <Link to="/">
      <button type="button" className="order-now-btn">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
