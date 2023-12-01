import {Switch, Route} from 'react-router-dom'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Login from './components/Login'
import RestaurantDetailsRoute from './components/RestaurantDetailsRoute'
import NotFound from './components/NotFound'
import Cart from './components/Cart'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute
        exact
        path="/restaurants-list/:id"
        component={RestaurantDetailsRoute}
      />
      <ProtectedRoute exact path="/cart" component={Cart} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
