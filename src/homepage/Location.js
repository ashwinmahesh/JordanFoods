import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import locationImage from './images/mapImage.png';

const useStyles = makeStyles(theme => ({
  sectionWrapper: {
    padding: '30px'
  },
  mapImage:{
    width:'300px',
    height:'300px',
    borderRadius: '6px',
    border: '1px solid black',
  },
  left: {
    display: 'inline-block',
    marginLeft: '40px',
    width: '480px',
    verticalAlign: 'top',
    '& p': {
      margin: '0px',
      fontSize: '14pt'
    }
  },
  addressDiv: {
    marginBottom: '20px',
  },
  hoursDiv: {
    marginBottom: '20px'
  }
}));

function Location() {
  const styles = useStyles();
  const hours = {
    Monday: {
      open: '12:00 AM',
      close: '11:30 PM'
    },
    Tuesday: {
      open: '12:00 AM',
      close: '11:30 PM'
    },
    Wednesday: {
      open: '12:00 AM',
      close: '11:30 PM'
    },
    Thursday: {
      open: '12:00 AM',
      close: '11:30 PM'
    },
    Friday: {
      open: '12:00 AM',
      close: '11:30 PM'
    },
    Saturday: {
      open: '12:00 AM',
      close: '11:30 PM'
    },
    Sunday: {
      open: '12:00 AM',
      close: '11:30 PM'
    },
  };

  return(
    <div className={styles.sectionWrapper}>
      <a href='https://google.com/maps'><img className={styles.mapImage} src={locationImage}></img></a>
      <div className={styles.left}>
        <div className={styles.addressDiv}>
          <p>1 Beale Street</p>
          <p>Memphis, TN 38103</p>
        </div>
        <div className={styles.hoursDiv}>
          <b><p>Hours:</p></b>
          {Object.keys(hours).map((day) => ( 
            <p key={day}>{day}: {hours[day]['open']} - {hours[day]['close']}</p>
          ))}
        </div>
        <div className={styles.contactDiv}>
          <b><p>Contact Us:</p></b>
          <p>(901) 361-2226</p>
          <p>email@email.com</p>
        </div>
      </div>
    </div>
  )
}

export default Location;