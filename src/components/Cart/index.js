import './index.css'
import Header from '../Header'
import CartItem from '../CartItem'
import Footer from '../Footer'

const Cart = () => {
  const cartList = JSON.parse(localStorage.getItem('cartList'))

  let totalCost = 0
  cartList.forEach(item => {
    totalCost += item.cost * item.quantity
  })

  return (
    <>
      <Header />
      <div className="cart-container">
        <ul className="cart-list-container">
          {cartList.map(cartItem => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))}
        </ul>
        <div className="order-summary-container">
          <div className="total-container">
            <p className="order-total-description">Order Total : </p>
            <p className="total-amount">₹{totalCost}.00</p>
          </div>
          <button type="button" className="place-order-btn">
            Place Order
          </button>
        </div>
      </div>
      <Footer className="footer-container" />
    </>
  )
}
export default Cart
