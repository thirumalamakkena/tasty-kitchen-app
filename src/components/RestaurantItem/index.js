import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const RestaurantItem = props => {
  const {restaurantData} = props
  const {name, imageUrl, cuisine, rating, totalReviews} = restaurantData

  return (
    <li className="restaurant-list-item">
      <img
        alt="restaurant"
        className="restaurant-item-img"
        data-testid="restaurant-item"
        src={imageUrl}
      />
      <div className="restaurant-brief-details">
        <h1 className="restaurant-name">{name}</h1>
        <p className="restaurant-cuisine">{cuisine}</p>
        <div className="rating-part-container">
          <BsFillStarFill className="rating-star-icon" />
          <p className="no-rating">{rating}</p>
          <p className="no-reviews">({totalReviews} ratings)</p>
        </div>
      </div>
    </li>
  )
}

export default RestaurantItem
