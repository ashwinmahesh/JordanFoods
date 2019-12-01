import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from './menuItem';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  pageTitle: {
    fontSize: '24pt',
    textAlign: 'center',
    fontWeight: 'bold',
    margin: '0px',
    marginTop: '15px',
    marginBottom: '20px',
    fontFamily: 'McLaren, cursive'
  },
  pageWrapper: {
    paddingLeft: '35px',
    paddingRight: '35px'
  }
}));

function Menu() {
  const styles = useStyles();

  const [menuItems, changeMenuItems] = useState({})

  async function fetchMenu() {
    const { data } = await axios.get('/fetchMenu');
    if(data.success === 1) {
      changeMenuItems(data.menu);
    }
  }

  useEffect(() => {
    fetchMenu();
  })

  const items = Object.keys(menuItems).map((key, index) => {
    const item = menuItems[key]
    return <MenuItem key={key} name={key} price={item.price} description={item.description} imagePath={item.imagePath}></MenuItem>
  })


  return(
    <div className={styles.pageWrapper}>
      <p className={styles.pageTitle}>Our Menu</p>
      {items}
    </div>
  )
}

export default Menu;