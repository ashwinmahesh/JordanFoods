import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import './App.css';

import Homepage from './homepage/homepage';
import Menu from './menu/menu';
import About from './about/about';
import Header from './header/header';
import Footer from './header/footer';

function App() {
  const [currentTab, changeTab] = useState('home');

  var tabChangedFromHeader = (newTab) => {
    changeTab(newTab);
    console.log("Current Tab:", currentTab);
  }
  
  return (
    <div className="App">
      <div className='wrapper'>
        <Router>

          <Route exact path='/'>
            <Header showNavigation={true}/>
            <Homepage />
            <Footer/>
          </Route>

          <Route exact path='/menu'>
            <Header showNavigation={true}/>
            <Menu/>
            <Footer/>
          </Route>

          <Route exact path='/about'>
            <Header showNavigation={true}/>
            <About />
            <Footer/>
          </Route>

          <Route exact path='/admin/login'>
            <Header />
            <p>This is where the admin login will be</p>
            <Footer/>
          </Route>

          <Route exact path='/admin'>
            <Header />
            <p>This is where the admin page will be</p>
            <Footer/>
          </Route>

        </Router>
      </div>
    </div>
  );
}

export default App;
