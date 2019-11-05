import React from 'react';
import bealeImage from './bealeImage2.jpg';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  image:{
    width: '900px',
    height: '350px',
    backgroundImage: `url(${bealeImage})`,
    // backgroundSize: 'cover',
    // backgroundSize: 'contain',
    backgroundSize: '900px 400px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  button: {
    background: 'none',
    width: '250px',
    fontSize: '16pt',
    color: 'white',
    paddingTop: '6px',
    paddingBottom: '6px',
    borderRadius: '6px',
    marginBottom: '20px',
    borderWidth: '1px',
    borderColor: 'white',
    '&:hover': {
      background: 'white',
      color:'black',
      borderColor: 'black'
    }
  },
}));

function MainImage() {
  const styles = useStyles()
  return(
    <div className={styles.image}>
      <button className={styles.button}>VIEW OUR MENU</button>
    </div>
  )
}

export default MainImage;