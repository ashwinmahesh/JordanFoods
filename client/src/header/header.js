import React from 'react';
import './header.css'
import axios from 'axios';

import {Link} from "react-router-dom";

type Props = {
  showNavigation?: boolean
}

function Header(props: Props) {
  // function switchToHome(){
  //   props.tabChanged('home')
  // }
  // function switchToMenu(){
  //   props.tabChanged('menu')
  // }
  function switchToAbout(){
    // props.tabChanged('about')
    axios.get('/test_route')
      .then( response => {
        console.log("Received response:", response.data)
      });
  }

  return(
    <div>
      <div className='top'>
        <p>Jordan's Hot and Cold Vending</p>
      </div>
      {props.showNavigation  &&
        <div className='bottom'>
          <Link to='/'>HOME</Link>
          <Link to='/menu'>MENU</Link>
          <Link to='/about'>ABOUT</Link>
        </div>
      }
      
    </div>
  )
}

export default Header;