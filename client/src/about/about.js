import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import headshot1 from './images/headshot.jpg'

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
    borderRadius: '150px'
  },
  bioWrapper: {
    width: '375px',
    border: '1px solid red',
    textAlign: 'center',
    display:'inline-block'
  },
  bothBios: {
    display: 'flex',
    justifyContent: 'space-evenly'
  }
}));

function About() {
  const styles = useStyles();

  function renderBio1() {
    return (
      <div className={styles.bioWrapper}>
        <img className={styles.headshot} src={headshot1} alt='Headshot 1'/>
      </div>
    )
  }

  return(
    <div className={styles.pageWrapper}>
      <p className={styles.pageTitle}>Meet the Owners</p>
      <p className={styles.subtext}>
        Jordan's Hot & Cold Vending is a local, family-owned business. Our goal is to bring you tasty, Memphis cooking to satisy your late-night hunger.
      </p>
      <div className={styles.bothBios}>
        {renderBio1()}
        {renderBio1()}
      </div>
    </div>
  )
}

export default About;