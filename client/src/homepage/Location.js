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

  const mapLink = 'https://www.google.com/maps/dir//Beale+St+%26+S+2nd+St,+Memphis,+TN+38103/@35.1399719,-90.0557014,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x87d57e97062c3979:0x52f2d60bf85c992e!2m2!1d-90.0535127!2d35.1399719!3e0'

  return(
    <div className={styles.sectionWrapper}>
      <a href={mapLink} target="_blank" rel="noopener noreferrer"><img className={styles.mapImage} src={locationImage} alt='location'></img></a>
      <div className={styles.left}>
        <div className={styles.addressDiv}>
          <p>Beale St & S 2nd St</p>
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
          <p>jdwight706@gmail.com</p>
        </div>
      </div>
    </div>
  )
}

export default Location;