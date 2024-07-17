import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar';
import SearchedProduct from './Components/SearchedProduct';
import Body from './Components/Body'; // Assuming you have a Home component
import ProductPage from './Components/ProductPage';
import PaymentSuccess from './Components/PaymentSuccess';
import './App.css'

const App = () => {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Body />} />
                <Route path="/searchedProduct" element={<SearchedProduct />} />
                <Route path="/productPage" element={<ProductPage />} />
                <Route path="/paymentsuccess" element={<PaymentSuccess />} />
            </Routes>
        </Router>
    );
}

export default App;
