import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MainImage from './mainImage';
import AboutFood from './AboutFood';
import Location from './Location';

type Props = {
  tabChanged: (string)=>(void)
}

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

function Homepage(props: Props) {
  const styles = useStyles();

  function changeTab() {
    props.tabChanged('menu');
  }
  return(
    <div>
      <MainImage changeTab={changeTab}/>
      <div className={styles.section}>
        <p className={styles.sectionText}>ABOUT OUR FOOD</p>
      </div>
      <AboutFood/>
      <div className={styles.section}>
        <p className={styles.sectionText}>LOCATION</p>
      </div>
      <Location/>
    </div>
  )
}

export default Homepage;