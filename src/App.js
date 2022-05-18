
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import UserProvider from './context/UserProvider'

import Header from './components/Header';
import Home from './pages/Home'
import Records from './pages/Records';
import Login from './pages/Login';
import Cart from './pages/Cart';
import AllOrders from './pages/AllOrders';
import Order from './pages/Order';
import Footer from './components/Footer';

import RecordView from './pages/RecordView';
import Register from './pages/Register';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';

function App() {

  return (
    <div className="App">
      <UserProvider>
        <Router>

          <Header />

          <Routes>
            {/* Home route */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/records" element={<Records />} />
            <Route exact path="/records/:record_id" element={<RecordView />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/profile' element={<Profile />} />
            <Route exact path='profile/edit' element={<EditProfile/> } />
            <Route exact path='/cart' element={<Cart />} />
            <Route path='/allorders' element={<AllOrders/>} />
            <Route path='/order/:order_id' element={<Order/>} />
          </Routes>

          <Footer />
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
