import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const RestaurantItem = props => {
  const {restaurantData} = props
  const {id, name, imageUrl, cuisine, rating, totalReviews} = restaurantData

  return (
    <Link to={`restaurants-list/${id}`} className="details-link">
      <li className="restaurant-list-item">
        <img alt="restaurant" className="restaurant-item-img" src={imageUrl} />
        <div className="restaurant-brief-details">
          <h1 className="restaurant-name">{name}</h1>
          <p className="restaurant-cuisine">{cuisine}</p>
          <div className="rating-part-container-1">
            <BsFillStarFill className="rating-star-icon" />
            <p className="no-rating">{rating}</p>
            <p className="no-reviews">({totalReviews} ratings)</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItem
