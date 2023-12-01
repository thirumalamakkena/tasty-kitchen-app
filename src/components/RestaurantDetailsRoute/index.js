import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'
import {BiRupee} from 'react-icons/bi'
import './index.css'
import Header from '../Header'
import RestaurantDetailsItem from '../RestaurantDetailsItem'
import Footer from '../Footer'

class RestaurantDetailsRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {restaurantDetails: {}, isLoading: true}
  }

  componentDidMount() {
    const parsedCartList = JSON.parse(localStorage.getItem('cartList'))
    if (parsedCartList === null)
      localStorage.setItem('cartList', JSON.stringify([]))

    this.getRestaurantInformation()
  }

  getRestaurantInformation = async () => {
    this.setState({isLoading: true})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const restaurantInfo = await response.json()

    const updatedData = {
      id: restaurantInfo.id,
      name: restaurantInfo.name,
      location: restaurantInfo.location,
      cuisine: restaurantInfo.cuisine,
      costOfTwo: restaurantInfo.cost_for_two,
      reviewsCount: restaurantInfo.reviews_count,
      rating: restaurantInfo.rating,
      imageUrl: restaurantInfo.image_url,
      foodItems: restaurantInfo.food_items.map(foodItem => ({
        id: foodItem.id,
        foodType: foodItem.food_type,
        cost: foodItem.cost,
        imageUrl: foodItem.image_url,
        name: foodItem.name,
        rating: foodItem.rating,
      })),
    }

    this.setState({restaurantDetails: updatedData, isLoading: false})
  }

  addItemToCart = item => {
    const parsedCartList = JSON.parse(localStorage.getItem('cartList'))

    const cartList = parsedCartList

    cartList.push(item)
    localStorage.setItem('cartList', JSON.stringify(cartList))
    this.getRestaurantInformation()
  }

  render() {
    const {restaurantDetails, isLoading} = this.state
    const {
      name,
      location,
      cuisine,
      costOfTwo,
      imageUrl,
      reviewsCount,
      foodItems,
      rating,
    } = restaurantDetails

    return (
      <>
        <Header />
        {!isLoading && (
          <div className="restaurant-info-container">
            <div className="restaurant-bg-information">
              <img alt="restaurant" className="food-img" src={imageUrl} />
              <div className="restaurant-information">
                <h1 className="restaurant-detail-title">{name}</h1>
                <p className="restaurant-detail-location">{cuisine}</p>
                <p className="restaurant-detail-location">{location}</p>
                <div className="rating-price-container">
                  <div className="rating-part-container">
                    <div className="rating-part">
                      <BsFillStarFill className="detail-icon" />
                      <p className="detail-no-rating">{rating}</p>
                    </div>
                    <p className="detail-no-reviews">{reviewsCount}+ Ratings</p>
                  </div>
                  <div className="price-part-container">
                    <div className="price-part">
                      <BiRupee className="detail-icon" />
                      <p className="detail-no-rating">{costOfTwo}</p>
                    </div>
                    <p className="detail-no-reviews">Cost for two</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="food-item-container">
              <ul className="food-items-list-container">
                {foodItems.map(item => (
                  <RestaurantDetailsItem
                    addItemToCart={this.addItemToCart}
                    key={item.id}
                    item={item}
                  />
                ))}
              </ul>
            </div>
          </div>
        )}
        <>
          <Footer />
        </>
      </>
    )
  }
}

export default RestaurantDetailsRoute
