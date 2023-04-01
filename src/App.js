import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './About';
import Login from './Login';
import Logout from './Logout';
import Profile from './Profile';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Header />
          <Login />
          <Profile />
          <Routes>
            <Route 
              exact path="/"
              element={<BestBooks />}
            >
            </Route>
            <Route exact path="/about" 
            element={<About/>} />
            {/* PLACEHOLDER: add a route with a path of '/about' that renders the `About` component */}
          </Routes>
          <Logout/>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
