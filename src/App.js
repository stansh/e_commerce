
import './App.css';
import data from './shared/getData';
import {Provider} from 'react-redux';
import AllProducts from './components/AllProducts';
import Product from './components/Product';
import {BrowserRouter as Router, Switch,Route,Redirect } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';



function App() {
  return (
    <Provider store = {configureStore()}>
      <Router>
        <div className="App">
          <Switch>
              <Route path = '/all' component = {AllProducts} /> 
              <Route path = '/:handle' component = {Product}  />
              <Redirect to ='/all' />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
