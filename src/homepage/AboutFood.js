import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ribsImage from './images/ribs.jpg';
import hotdogImage from './images/hotDog.jpg';

const useStyles = makeStyles(theme => ({
  sectionWrapper:{
    backgroundColor: 'white',
    textAlign: 'center',
    paddingTop: '30px',
    paddingBottom: '30px'
    // display: 'flex',
    // justifyContent: 'center',
  },
  imageStyle:{
    width: '200px',
    height: '200px',
    borderRadius: '100px',
  },
  firstAbout: {
    // marginTop: '30px',
    display: 'block',
    height: '200px',
  },
  secondAbout: {
    marginTop: '60px',
    display: 'block',
    height: '200px',
  },
  singleAbout: {
    marginTop: '30px',
    display: 'block',
    height: '200px',
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
    margin: '0px',
    textAlign: 'left'
  },
  smallText: {
    fontSize: '15pt',
    margin: '0px',
    marginTop: '20px',
    textAlign: 'left'
  },
  block: {display: 'block'},
}));

function AboutFood() {
  const styles = useStyles();

  function renderFirstAbout(){
    const bigText="Smoked Memphis BBQ"
    const smallText = "Ribs and such that will make your mouth salivate. TBD Will rewrite this section. Lorum IpsumRibs and such that will make your mouth salivate. TBD Will rewrite this section. Lorum Ipsum";
    return (
      <div className={styles.firstAbout}>
        <img className={styles.imageStyle} src={ribsImage} alt='First Food'></img>
        <div className={styles.textDiv}>
          <p className={styles.bigText}>{bigText}</p>
          <p className={styles.smallText}>{smallText}</p>
        </div>
      </div>
    );
  }

  function renderSecondAbout(){
    const bigText = "Unique Hot Dogs and Sausages";
    const smallText = "Most Unique Hot Dogs in Memphis! We serve hot dogs and smoked sausages topped with homemade ground beef and coleslaw. Will add more to this section + reword in the future. Lorum Ipsum Lorum Ipsum Lorum Ipsum Lorum Ipsum"
    return (
      <div className={styles.secondAbout}>
        <img className={styles.imageStyle} src={hotdogImage} alt='Second Food'></img>
        <div className={styles.textDiv}>
          <p className={styles.bigText}>{bigText}</p>
          <p className={styles.smallText}>{smallText}</p>
        </div>
      </div>
    )
  }

  return(
    <div className={styles.sectionWrapper}>
      {renderFirstAbout()}
      {renderSecondAbout()}
    </div>
  );
}

export default AboutFood;