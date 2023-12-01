import {Component} from 'react'

import {BsFillStarFill} from 'react-icons/bs'
import {BiRupee} from 'react-icons/bi'
import './index.css'
import Counter from '../Counter'

class RestaurantDetailsItem extends Component {
  state = {quantity: 1}

  render() {
    const {quantity} = this.state
    const {item, addItemToCart} = this.props
    const {id, imageUrl, name, rating, cost} = item

    const onClickAdd = () => {
      addItemToCart({...item, quantity})
    }

    const cartList = JSON.parse(localStorage.getItem('cartList'))

    const index = cartList.findIndex(cartItem => cartItem.id === id)

    const hideAddBtn = index === -1

    return (
      <li className="restaurant-detail-list-item">
        <img
          alt="restaurant"
          className="restaurant-item-detail-img"
          src={imageUrl}
        />
        <div className="restaurant-detail-brief-details">
          <h1 className="restaurant-detail-name">{name}</h1>
          <div className="detail-price-part">
            <BiRupee className="rupee-detail-icon" />
            <p className="detail-cost">{cost}.00</p>
          </div>
          <div className="rating-part-detail-container">
            <BsFillStarFill className="rating-detail-icon" />
            <p className="no-detail-rating">{rating}</p>
          </div>
          {hideAddBtn && (
            <button type="button" className="add-btn" onClick={onClickAdd}>
              ADD
            </button>
          )}
          {!hideAddBtn && <Counter cartId={id} />}
        </div>
      </li>
    )
  }
}

export default RestaurantDetailsItem
