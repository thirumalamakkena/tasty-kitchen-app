import './index.css'
import Counter from '../Counter'

const CartItem = props => {
  const {cartItem} = props
  const {imageUrl, name, cost, id, quantity} = cartItem
  return (
    <li className="cart-item-container">
      <img alt="food" className="cart-item-img" src={imageUrl} />
      <div className="cart-item-details">
        <h1 className="cart-item-name">{name}</h1>
        <Counter className="counter" cartId={id} />
        <p className="item-price">₹ {cost * quantity}.00</p>
      </div>
    </li>
  )
}

export default CartItem
