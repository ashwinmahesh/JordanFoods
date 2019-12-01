import React from 'react';
import './header.css'

import {Link} from "react-router-dom";

function Header() {
  return(
    <div>
      <div className='top'>
        <p>Jordan's Hot and Cold Vending</p>
      </div>
        <div className='bottom'>
          <Link to='/'>HOME</Link>
          <Link to='/menu'>MENU</Link>
          <Link to='/about'>ABOUT</Link>
        </div>
    </div>
  )
}

export default Header;