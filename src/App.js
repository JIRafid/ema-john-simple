import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Switch,
  Redirect,
  useLocation
} from "react-router-dom";
import Inventory from './components/Inventory/Inventory';
import Review from './components/Review/Review';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/shop" element={<Shop />} />
          <Route path="/review" element={<Review />} />
          <Route path="/inventory" element= {<Inventory />} />
          <Route exact path="/" element={<Shop />} />
          <Route path="/product/:productKey"  element= {<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
