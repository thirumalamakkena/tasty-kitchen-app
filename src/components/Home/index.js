import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdSort} from 'react-icons/md'
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdArrowDropdown,
} from 'react-icons/io'

import RestaurantItem from '../RestaurantItem'

import Header from '../Header'
import './index.css'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      carousels: [],
      restaurantsList: [],
      activePage: 1,
      selectedSortByValue: 'Lowest',
    }
  }

  componentDidMount() {
    this.getRestaurantsData()
    this.getRestaurantsOffersData()
  }

  getRestaurantsOffersData = async () => {
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const offerCarousels = await response.json()
    this.setState({
      carousels: offerCarousels.offers.map(item => ({
        id: item.id,
        imageUrl: item.image_url,
      })),
    })
  }

  getRestaurantsData = async () => {
    const {activePage, selectedSortByValue} = this.state
    const offset = (activePage - 1) * 9
    const url = `https://apis.ccbp.in/restaurants-list/?offset=${offset}&limit=${9}&sort_by_rating=${selectedSortByValue}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const restaurantsData = await response.json()

    const updatedData = restaurantsData.restaurants.map(data => ({
      imageUrl: data.image_url,
      id: data.id,
      name: data.name,
      cuisine: data.cuisine,
      rating: data.user_rating.rating,
      totalReviews: data.user_rating.total_reviews,
    }))
    // console.log(restaurantsData)
    this.setState({
      restaurantsList: updatedData,
    })
  }

  onDecrementPage = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({activePage: prevState.activePage - 1}),
        this.getRestaurantsData,
      )
    }
  }

  onIncrementPage = () => {
    const {activePage} = this.state
    if (activePage < 4) {
      this.setState(
        prevState => ({activePage: prevState.activePage + 1}),
        this.getRestaurantsData,
      )
    }
  }

  onSorting = event =>
    this.setState(
      {selectedSortByValue: event.target.value},
      this.getRestaurantsData,
    )

  render() {
    const {restaurantsList, activePage} = this.state
    return (
      <>
        <Header />
        <div className="home-page-main-container">
          <img
            alt="carousel"
            className="carousel-img"
            src="https://assets.ccbp.in/frontend/react-js/restaurants-app-project/carousel-images-jammu-special.jpg"
          />
          <div className="home-page-container">
            <div className="items-heading-sorting-container">
              <h1 className="home-item-heading">Popular Restaurants</h1>
              <p className="home-item-greet">
                Select Your favourite restaurant special dish and make your day
                happy...
              </p>

              <div className="sorting-container">
                <MdSort className="sort-icon" />
                <p className="sort-name">Sort by</p>
                <select className="select-ele" onChange={this.onSorting}>
                  <option value="Lowest" className="sort-opt">
                    Lowest
                  </option>
                  <option value="Highest" className="sort-opt">
                    Highest
                  </option>
                </select>
                <IoMdArrowDropdown />
              </div>
              <hr />
              <ul className="restaurants-lists-container">
                {restaurantsList.map(restaurantData => (
                  <RestaurantItem
                    key={restaurantData.id}
                    restaurantData={restaurantData}
                  />
                ))}
              </ul>
            </div>
            <div className="pagination-container">
              <button type="button" className="arrow-btn">
                <IoIosArrowBack
                  className="arrow-icon"
                  onClick={this.onDecrementPage}
                />
              </button>
              <p className="pagination-values">{activePage} of 4</p>
              <button
                type="button"
                className="arrow-btn"
                onClick={this.onIncrementPage}
              >
                <IoIosArrowForward className="arrow-icon" />
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Home
