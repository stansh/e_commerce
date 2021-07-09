
import './App.css';
import data from './shared/getData';
import AllProducts from './components/AllProducts'


console.log(data)
function App() {
  return (
    <div className="App">
       <AllProducts />
    </div>
  );
}

export default App;
