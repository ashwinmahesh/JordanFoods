import React, {useState} from 'react';
import './App.css';
import Homepage from './homepage/homepage';
import Menu from './menu/menu';
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
        <Header tabChanged={tabChangedFromHeader}/>
        {currentTab === 'home' ? <Homepage/> : null}
        {currentTab === 'menu' ? <Menu/> : null}
        {currentTab === 'about' ? <p>About</p> : null}
        <Footer/>
      </div>
    </div>
  );
}

export default App;
