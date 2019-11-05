import React from 'react';
import './header.css'

function Header() {
  return(
    <div>
      <div className='top'>
        <p>Jordan's Hot and Cold Vending</p>
      </div>
      <div className='bottom'>
        <a href='/'>HOME</a>
        <a href='#'>MENU</a>
        <a href='#'>ABOUT</a>
      </div>
    </div>
  )
}

export default Header;