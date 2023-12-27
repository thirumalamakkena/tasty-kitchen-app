import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdSort} from 'react-icons/md'
import Loader from 'react-loader-spinner'

import Slider from 'react-slick'

import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdArrowDropdown,
} from 'react-icons/io'

import RestaurantItem from '../RestaurantItem'

import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      carouselsList: [],
      restaurantsList: [],
      activePage: 1,
      selectedSortByValue: 'Lowest',
      apiStatus: apiStatusConstants.initial,
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
      carouselsList: offerCarousels.offers.map(item => ({
        id: item.id,
        imageUrl: item.image_url,
      })),
    })
  }

  getRestaurantsData = async () => {
    const {activePage, selectedSortByValue} = this.state
    const offset = (activePage - 1) * 9
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = `https://apis.ccbp.in/restaurants-list/?offset=${offset}&limit=${9}&sort_by_rating=${selectedSortByValue}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    
    const response = await fetch(url, options)
    if (response.ok) {
      const restaurantsData = await response.json()

      const updatedData = restaurantsData.restaurants.map(data => ({
        imageUrl: data.image_url,
        id: data.id,
        name: data.name,
        cuisine: data.cuisine,
        rating: data.user_rating.rating,
        totalReviews: data.user_rating.total_reviews,
      }))

      this.setState({
        restaurantsList: updatedData,
      })
      this.setState({apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
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

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderRestaurantDetailsView = () => {
    const {restaurantsList, activePage, carouselsList} = this.state
    const settings = {
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    }

    return (
      <>
        <div className="carousel-container">
          <Slider {...settings}>
            {carouselsList.map(carouselItem => (
              <div key={carouselItem.id}>
                <img
                  alt="carousel"
                  className="carousel-img"
                  src={carouselItem.imageUrl}
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="home-page-container">
          <div className="items-heading-sorting-container">
            <div>
              <h1 className="home-item-heading">Popular Restaurants</h1>
              <p className="home-item-greet">
                Select Your favourite restaurant special dish and make your day
                happy...
              </p>
            </div>

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
          </div>
          <hr className="horizontal-line" />
          <ul className="restaurants-lists-container">
            {restaurantsList.map(restaurantData => (
              <RestaurantItem
                key={restaurantData.id}
                restaurantData={restaurantData}
              />
            ))}
          </ul>
          <div className="pagination-container">
            <button
              type="button"
              className="arrow-btn"
              onClick={this.onDecrementPage}
            >
              <IoIosArrowBack className="arrow-icon" />
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
        <Footer />
      </>
    )
  }

  renderRestaurantDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantDetailsView()

      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-page-main-container">
          {this.renderRestaurantDetails()}
        </div>
      </>
    )
  }
}

export default Home
