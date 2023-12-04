import {Link} from 'react-router-dom'

import './index.css'

const OrderPlaced = () => (
  <div className="container">
    <img
      alt="not found"
      className="not-found-img"
      src="https://res.cloudinary.com/dpakgiqtz/image/upload/v1701695461/n2hsnbo8tydttdnvv7c9.png"
    />
    <h1 className="m-title">Payment Successful</h1>
    <p className="m-description">
      Thank you for ordering. Your payment is successfully completed.
    </p>
    <Link to="/">
      <button type="button" className="order-now-btn">
        Go to Home Page
      </button>
    </Link>
  </div>
)

export default OrderPlaced
