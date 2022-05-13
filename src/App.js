
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios'
import config from './config'
import jwt_decode from "jwt-decode";

// import react hooks stuff
import { useState, useEffect, useContext } from 'react';
// impport react router stuff

import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import ProductContext from './context/ProductContext';

import UserProvider from './context/UserProvider'

import Header from './components/Header';
import Home from './pages/Home'
import Records from './pages/Records';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import Loader from './components/Loader'


//test
import SubmittedForm from './pages/SubmittedForm';
import RecordView from './pages/RecordView';
import Register from './pages/Register';
import Profile from './pages/Profile';



function App() {

  const [records, setRecords] = useState([]);

  

  const getRecordByID = (record_id) => {
    return records.filter((p) => p.id === parseInt(record_id))[0];
  };

  const context = {
    records: async () => {
        let response = await axios.get(config.TEST_API_URL + "/records")
        console.log(response.data);
        setRecords(response.data)
      return response.data
    },
    getRecordByID,
    // user: () => {
    //   return user
    // },
    // setUser: (user) => {
    // axios call to fetch user data
    // useState ==> this.setState: 
    // setUser(resp)
    // return (user)
    // }
  }

  return (
    <div className="App">
      <UserProvider>
      <Router>
          {/* <ProductContext.Provider value={context}> */}

            <Header />

            <Routes>
              {/* Home route */}
              <Route path="/" element={<Home />} />

              {/* About Us route */}
              <Route path="/login" element={<Login />} />
              <Route path="/records" element={<Records />} />
              <Route path="/form-submitted" element={<SubmittedForm />} />
              <Route exact path="/records/:record_id" element={<RecordView />} />
              <Route exact path='/register' element={<Register />} />
              <Route exact path='/profile' element={<Profile />} />
              <Route exact path='/cart' element={<Cart />} />
            </Routes>

            <Footer />
          {/* </ProductContext.Provider> */}
      </Router>
      </UserProvider>
    </div>
  );
}

export default App;
