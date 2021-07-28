
import './App.css';

import { Provider } from 'react-redux';
import AllProducts from './components/AllProducts';
import Product from './components/Product';
import {BrowserRouter as Router, Switch,Route,Redirect } from 'react-router-dom';
import {configureStore} from './redux/store';
import {persistStore} from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import {productsData} from './shared/productsData';

const store = configureStore();
const persistor = persistStore(store);

function App() {
  return (
    <Provider  store = {store}>
      <PersistGate
         loading = {<div>Loading...</div>}  
         persistor = {persistor} >  
        <Router>
          <div className="App">
            <Switch>
                <Route path = '/all' component = {AllProducts} /> 
                <Route path = '/:index' component = {Product} width = '20%' />
                <Redirect to ='/all' />
            </Switch>
          </div>
        </Router>
      </PersistGate>  
    </Provider>
  );
}

export default App;
