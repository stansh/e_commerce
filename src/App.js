
import './App.css';
import { Provider } from 'react-redux';
import AllProducts from './components/AllProducts';
import Product from './components/Product';
import Cart from './components/Cart';
import Header from './components/Header';
import UserProfile from './components/UserProfile';
import {BrowserRouter as Router, Switch,Route,Redirect } from 'react-router-dom';
import {configureStore} from './redux/store';
//import {persistStore} from 'redux-persist';
//import { PersistGate } from 'redux-persist/integration/react';

const store = configureStore();
//const persistor = persistStore(store);

function App() {
  return (
    // <Auth0ProviderWithHistory>
      <Provider  store = {store}>
          <Router>
            <div className="App">
				<Header />
				<Switch>
					<Route path = '/' exact component = {AllProducts} /> 
					<Route path = '/products/:id' component = {Product} width = '20%' /> 
					<Route path = '/cart' component = {Cart} width = '20%' />
					<Route path = '/profile' component = {UserProfile} width = '20%' />
					<Redirect to ='/' /> 
				</Switch>
            </div>
          </Router>
       </Provider>
    // </Auth0ProviderWithHistory>
  );
}

export default App;

 {/* <PersistGate
          loading = {<div>Loading...</div>}  > 
          persistor = {persistor}   */}

  {/*  </PersistGate>   */}