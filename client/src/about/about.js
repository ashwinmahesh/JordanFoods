import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import headshot1 from './images/headshot.jpg';
import headshot2 from './images/headshot2.jpg';

const useStyles = makeStyles(theme => ({
  pageWrapper: {
    paddingLeft: '35px',
    paddingRight: '35px'
  },
  pageTitle: {
    fontSize: '24pt',
    textAlign: 'center',
    fontWeight: 'bold',
    margin: '0px',
    marginTop: '15px',
    marginBottom: '20px'
  },
  subtext: {
    fontSize: '16pt',
    marginTop: '15px'
  },
  headshot: {
    width: '300px',
    borderRadius: '200px'
  },
  bioWrapper: {
    width: '375px',
    textAlign: 'center',
    display:'inline-block',
    padding: '15px'
  },
  bothBios: {
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  nameText: {
    fontSize: '18pt',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '0px',
    marginTop: '15px'
  },
  description: {
    fontSize: '14pt',
    margin: '0px',
    marginTop: '15px',
    textAlign: 'justify'
  }
}));

function About() {
  const styles = useStyles();

  function renderBio1() {
    return (
      <div className={styles.bioWrapper}>
        <img className={styles.headshot} src={headshot1} alt='Headshot 1'/>
        <p className={styles.nameText}>Dwight Jordan</p>
        <p className={styles.description}>
          Born and raised in Memphis, Dwight is a big fan of the culture and of Beale Street. Dwight is passionate about making his business, and has been doing it for a long time. His other interests include watching the Tennessee Titans, playing the guitar, and going Hiking
        </p>
      </div>
    )
  }

  function renderBio2() {
    return (
      <div className={styles.bioWrapper}>
        <img className={styles.headshot} src={headshot2} alt='Headshot 2'/>
        <p className={styles.nameText}>Mrs. Jordan</p>
        <p className={styles.description}>
          Born and raised in Memphis, Dwight is a big fan of the culture and of Beale Street. Dwight is passionate about making his business, and has been doing it for a long time. His other interests include watching the Tennessee Titans, playing the guitar, and going Hiking
        </p>
      </div>
    )
  }

  return(
    <div className={styles.pageWrapper}>
      <p className={styles.pageTitle}>Meet the Owners</p>
      {/* <p className={styles.subtext}>
        Jordan's Hot & Cold Vending is a local, family-owned business. Our goal is to bring you tasty, Memphis cooking to satisy your late-night hunger.
      </p> */}
      <div className={styles.bothBios}>
        {renderBio1()}
        {renderBio2()}
      </div>
    </div>
  )
}

export default About;