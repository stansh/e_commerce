
import './App.css';

import data from './shared/getData';
import AllProducts from './components/AllProducts';
import Product from './components/Product';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';


console.log(data)
function App() {
  return (
    <Router>
    <div className="App">
      
      <Switch>
           <Route path = '/all' component = {AllProducts} /> 
         <Route path = '/:handle' component = {Product}  />
         
      </Switch>
       
      
    </div></Router>
    
  );
}
console.log(AllProducts.products) 
export default App;
