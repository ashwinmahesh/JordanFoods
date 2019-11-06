import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from './menuItem';
import ribsImage from './images/ribs.jpg'

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

  return(
    <div className={styles.pageWrapper}>
      <p className={styles.pageTitle}>Our Menu</p>
      <MenuItem name='Supreme Hot Dog' description='This is a supreme hot dog' image={ribsImage} price='6.99'/>
      <MenuItem name='Supreme Hot Dog' description='This is a supreme hot dog' image={ribsImage} price='6.99'/>
      <MenuItem name='Supreme Hot Dog' description='This is a supreme hot dog' image={ribsImage} price='6.99'/>
      <MenuItem name='Supreme Hot Dog' description='This is a supreme hot dog' image={ribsImage} price='6.99'/>

    </div>
  )
}

export default Menu;