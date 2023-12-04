import {Link} from 'react-router-dom'

import './index.css'

const NoOrders = () => (
  <div className="container">
    <img
      alt="not found"
      className="not-found-img"
      src="https://res.cloudinary.com/dpakgiqtz/image/upload/v1697203082/r3skhw8xcl6czziq8ss5.png"
    />
    <h1 className="m-title">No Orders Yet!</h1>
    <p className="m-description">
      Your cart is empty. Add something from the menu.
    </p>
    <Link to="/">
      <button type="button" className="order-now-btn">
        Order Now
      </button>
    </Link>
  </div>
)

export default NoOrders
