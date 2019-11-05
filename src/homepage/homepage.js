import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MainImage from './mainImage';
import AboutFood from './AboutFood';


const useStyles = makeStyles(theme => ({
  section: {
    // backgroundColor: 'rgb(189, 111, 111)',
    backgroundColor:'rgb(145, 44, 44)',
    paddingTop: '10px',
    paddingBottom: '10px'
  },
  sectionText: {
    fontSize: '18pt',
    textAlign: 'center',
    margin: '0px',
    color:'white'
  }
}));

function Homepage() {
  const styles = useStyles();

  return(
    <div>
      <MainImage/>
      <div className={styles.section}>
        <p className={styles.sectionText}>ABOUT OUR FOOD</p>
      </div>
      <AboutFood/>
    </div>
  )
}

export default Homepage;