import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ribsImage from './images/ribs.jpg'

const useStyles = makeStyles(theme => ({
  sectionWrapper:{
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    width: '900px',
  },
  imageStyle:{
    width: '200px',
    height: '200px',
    borderRadius: '100px',
  },
  singleAbout: {
    marginTop: '30px',
    display: 'block',
    border: '1px solid red',
    height: '200px'
  },
  textDiv: {
    marginLeft: '20px',
    width: '550px',
    display: 'inline-block',
    verticalAlign: 'top'
  },
  bigText: {
    fontWeight: 'bold',
    fontSize: '18pt',
    // display: 'inline-block',    
    margin: '0px'
  },
  smallText: {
    // display: 'inline-block',
    fontSize: '15pt',
    margin: '0px',
    marginTop: '20px'
  },
}));

function AboutFood() {
  const styles = useStyles();

  function renderFirstAbout(){
    return (
      <div className={styles.singleAbout}>
        <img className={styles.imageStyle} src={ribsImage}></img>
        <div className={styles.textDiv}>
          <p className={styles.bigText}>Smoked Memphis BBQ</p>
          <p className={styles.smallText}>Ribs and such that will make your mouth salivate. TBD Will rewrite this section. Lorum IpsumRibs and such that will make your mouth salivate. TBD Will rewrite this section. Lorum Ipsum</p>
        </div>
      </div>
    );
  }

  function renderSecondAbout(){
    return (
      <div className={styles.singleAbout}>
        <img className={styles.imageStyle} src={ribsImage}></img>
        <div className={styles.textDiv}>
          <p className={styles.bigText}>Smoked Memphis BBQ</p>
          <p className={styles.smallText}>Ribs and such that will make your mouth salivate. TBD Will rewrite this section. Lorum IpsumRibs and such that will make your mouth salivate. TBD Will rewrite this section. Lorum Ipsum</p>
        </div>
      </div>
    )
  }

  return(
    <div className={styles.sectionWrapper}>
      {renderFirstAbout()}
      {/* {renderSecondAbout()} */}
    </div>
  );
}

export default AboutFood;