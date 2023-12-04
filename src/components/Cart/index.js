import {Component} from 'react'
import './index.css'
import Header from '../Header'
import CartItem from '../CartItem'
import Footer from '../Footer'
import NoOrders from '../NoOrders'
import OrderPlaced from '../OrderPlaced'

const apiConstants = {
  cartEmpty: 'empty',
  showCartItems: 'show',
  orderPlaced: 'placed',
}

class Cart extends Component {
  state = {apiStatus: apiConstants.cartEmpty, cartList: []}

  componentDidMount() {
    const getCartList = JSON.parse(localStorage.getItem('cartList'))
    this.setState({
      apiStatus:
        getCartList.length === 0
          ? apiConstants.cartEmpty
          : apiConstants.showCartItems,
      cartList: getCartList,
    })
  }

  getCartView = apiStatus => {
    switch (apiStatus) {
      case apiConstants.orderPlaced:
        return <OrderPlaced />
      case apiConstants.cartEmpty:
        return <NoOrders />
      default:
        return this.getCartItems()
    }
  }

  emptyLocalStorage = () => {
    localStorage.setItem('cartList', '[]')
  }

  onOrderPlaced = () =>
    this.setState({apiStatus: apiConstants.orderPlaced}, this.emptyLocalStorage)

  getCartItems = () => {
    const {cartList} = this.state
    let totalCost = 0
    cartList.forEach(item => {
      totalCost += item.cost * item.quantity
    })

    return (
      <>
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
            <button
              type="button"
              className="place-order-btn"
              onClick={this.onOrderPlaced}
            >
              Place Order
            </button>
          </div>
        </div>
        <Footer className="footer-container" />
      </>
    )
  }

  render() {
    const {apiStatus} = this.state

    return (
      <>
        <Header />
        {this.getCartView(apiStatus)}
      </>
    )
  }
}
export default Cart
