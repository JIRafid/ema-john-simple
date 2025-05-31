import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Switch,
  Redirect,
  useLocation,
} from "react-router-dom";
import Inventory from "./components/Inventory/Inventory";
import Review from "./components/Review/Review";
import NotFound from "./components/NotFound/NotFound";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Login from "./components/Login/Login";
import Shipment from "./components/Shipment/Shipment";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const UserContext = createContext();

function App(props) {
  const [loggedInUser, setloggedInUser] = useState({});
  return (
    <Router>
      <UserContext.Provider value={[loggedInUser, setloggedInUser]}>
        <h3>Email: {loggedInUser.email}</h3>
        <Header />
        <Routes>
          <Route path="/shop" element={<Shop />} />
          <Route path="/review" element={<Review />} />
          <Route
            path="/inventory"
            element={
              <PrivateRoute>
                <Inventory />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/shipment"
            element={
              <PrivateRoute>
                <Shipment />
              </PrivateRoute>
            }
          />

          <Route exact path="/" element={<Shop />} />
          <Route path="/product/:productKey" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
