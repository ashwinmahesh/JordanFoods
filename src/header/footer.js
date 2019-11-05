import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  mainDiv: {
    backgroundColor: "rgb(145, 44, 44)",
    paddingTop: '15px',
    paddingBottom: '15px'
  },
  mainText: {
    fontSize: '12pt',
    color: 'white',
    textAlign: 'center'
  }
}));

function Footer() {
  const styles = useStyles();

  return(
    <div className={styles.mainDiv}>
      <p className={styles.mainText}>Copyright 2019. All Rights Reserved</p>
    </div>
  )
}

export default Footer;