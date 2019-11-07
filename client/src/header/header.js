import React from 'react';
import './header.css'

type Props = {
  tabChanged: (string)=>(void)
}

function Header(props: Props) {
  function switchToHome(){
    props.tabChanged('home')
  }
  function switchToMenu(){
    props.tabChanged('menu')
  }
  function switchToAbout(){
    props.tabChanged('about')
  }

  return(
    <div>
      <div className='top'>
        <p>Jordan's Hot and Cold Vending</p>
      </div>
      <div className='bottom'>
        <a onClick={switchToHome}>HOME</a>
        <a onClick={switchToMenu}>MENU</a>
        <a onClick={switchToAbout}>ABOUT</a>
      </div>
    </div>
  )
}

export default Header;