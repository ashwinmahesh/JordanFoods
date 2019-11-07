import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from './menuItem';
import ribsImage from './images/ribs.jpg';
import hotdogImage from './images/hotDog.jpg';

const useStyles = makeStyles(theme => ({
  pageTitle: {
    fontSize: '24pt',
    textAlign: 'center',
    fontWeight: 'bold',
    margin: '0px',
    marginTop: '15px',
    marginBottom: '20px'
  },
  pageWrapper: {
    paddingLeft: '35px',
    paddingRight: '35px'
  }
}));

function Menu() {
  const styles = useStyles();

  const items=[
    { name: 'Smoked Memphis Ribs',
      description: 'These ribs are some of the best in Memphis. Smoked hot on the grill, and served to you fresh. These ribs are guaranteed to make you salivate. I wonder how long this text needs to be. Adding more for aeshthetics.',
      image: ribsImage,
      price: '8.99'
    },
    {
      name: 'Grilled Hot Dog',
      description: 'Hot Dog grilled fresh in front of you. Topped with coleslaw, ground beef, and bbq sauce. This is a unique flavor combo that will make your mouth go wow. This stuff is delicious!',
      image: hotdogImage,
      price: '5.99'
    }
  ]

  return(
    <div className={styles.pageWrapper}>
      <p className={styles.pageTitle}>Our Menu</p>
      {items.map((item) => 
        <MenuItem name={item.name} description={item.description} image={item.image} price={item.price}/>
      )}
      {items.map((item) => 
        <MenuItem name={item.name} description={item.description} image={item.image} price={item.price}/>
      )}
      {items.map((item) => 
        <MenuItem name={item.name} description={item.description} image={item.image} price={item.price}/>
      )}
      {items.map((item) => 
        <MenuItem name={item.name} description={item.description} image={item.image} price={item.price}/>
      )}
      {items.map((item) => 
        <MenuItem name={item.name} description={item.description} image={item.image} price={item.price}/>
      )}
      {items.map((item) => 
        <MenuItem name={item.name} description={item.description} image={item.image} price={item.price}/>
      )}
      <MenuItem name={items[0].name} description={items[0].description} image={items[0].image} price={items[0].price}/>
    </div>
  )
}

export default Menu;