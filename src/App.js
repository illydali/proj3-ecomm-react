import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// impport react router stuff
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductContext from './context/ProductContext'; 

import Header from'./components/Header';
import Home from './pages/Home'
import Records from './pages/Records';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import Carousel from './components/Carousel';


function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> 
      </header> */}
      
      <Header/>
      <Carousel/>
      <Router>
        <Link to='/'>Home </Link> 
        <Link to='/records'> Records </Link>
        <Link to='/login'>Login</Link>
        <Link to='/cart'> Cart </Link>
        <Routes>
        {/* Home route */}
        <Route path="/" element={<Home/>} />

        {/* About Us route */}
        <Route path="/records" element={<Records/>} />

        <Route path="/login" element={<Login/>} />
        <Route path='/cart' element={<Cart/>}/>

        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
