import {Component} from 'react'

import './index.css'

class Counter extends Component {
  constructor(props) {
    super(props)
    const {cartId} = this.props
    const cartList = JSON.parse(localStorage.getItem('cartList'))
    const index = cartList.findIndex(item => item.id === cartId)
    const itemQuantity = cartList[index].quantity
    this.state = {quantity: itemQuantity}
  }

  onIncrement = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  onDecrement = () => {
    const {quantity} = this.state
    if (quantity === 0) {
      const {cartId} = this.props
      const cartList = JSON.parse(localStorage.getItem('cartList'))
      const newCart = cartList.filter(item => item.id !== cartId)
      console.log(newCart)
      localStorage.setItem('cartList', JSON.stringify(newCart))
    } else {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  render() {
    const {quantity} = this.state
    const {cartId} = this.props

    const cartList = JSON.parse(localStorage.getItem('cartList'))

    const updatedCart = cartList.map(cartItem => {
      if (cartItem.id === cartId) {
        return {...cartItem, quantity}
      }
      return cartItem
    })

    localStorage.setItem('cartList', JSON.stringify(updatedCart))

    return (
      <div className="counter-container">
        <button
          type="button"
          className="incr-decr-btn"
          onClick={this.onDecrement}
          data-testid="decrement-quantity"
        >
          -
        </button>
        <p className="counter-value">{quantity}</p>
        <button
          type="button"
          className="incr-decr-btn"
          onClick={this.onIncrement}
          data-testid="increment-quantity"
        >
          +
        </button>
      </div>
    )
  }
}

export default Counter
