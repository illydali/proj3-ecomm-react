// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// impport react router stuff
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductContext from './context/ProductContext';

import Header from './components/Header';
import Home from './pages/Home'
import Records from './pages/Records';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import Loading from './components/Loading';


//test
import SubmittedForm from './pages/SubmittedForm';
import RecordView from './pages/RecordView';
import Register from './pages/Register';
import Profile from './pages/Profile';


function App() {
  return (
    <div className="App">
     
      <Router>

        <Header />
        {/* <Loading/> */}

        {/* <Link to='/'>Home </Link>
        <Link to='/records'> Records </Link>
       
        <Link to='/login'>Login</Link>
        <Link to='/cart'> Cart </Link> */}
        <Routes>
          {/* Home route */}
          <Route path="/" element={<Home />} />

          {/* About Us route */}
          <Route path="/login" element={<Login />} />
          <Route path="/records" element={<Records />} />

         
          <Route path='/cart' element={<Cart />} />
          <Route path="/form-submitted" element={<SubmittedForm />} />
          <Route exact path="/records/:record_id" element={<RecordView />} />
          <Route exact path='/register' element={<Register/>} />
          <Route exact path='/profile' element={<Profile/>} />
        </Routes>

        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
