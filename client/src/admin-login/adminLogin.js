import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import bealeImage from './images/beale.jpg';
import { CardContent, CardMedia, Card, TextField, Button } from '@material-ui/core';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  loginBox: {
    width: '400px',
    background: 'rgb(242, 242, 242)',
    margin: 'auto',
    marginTop: '20px',
    marginBottom: '20px'
  },
  inputStyle: {
    width: '365px',
    background: 'white'
  },
  headerText: {
    fontSize: '16pt',
    fontWeight: 'bold',
    margin:'0px',
    textAlign: 'center',
    color: 'rgb(145, 44, 44)'
  },
  media: {
    height: '110px'
  },
  buttonDivStyle: {
    textAlign: 'center',
    display: 'block',
    marginTop: '20px'
  },
  buttonStyle: {
    width: '100px'
  },
  errorMessage: {
    color: 'red',
    fontStyle: 'italic',
    margin: '0px',
    marginTop: '5px'
  },
  pageWrapper: {
    minHeight: '75vh'
  }
}));

function AdminLogin() {
  const styles = useStyles();
  const [username, changeUsername] = useState('');
  const [password, changePassword] = useState('');
  const [showError, changeError] = useState(false);
  const [redirect, changeRedirect] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, [])

  async function loginPressed() {
    const { data } = await axios.post('/processLogin', {username, password})
    if(data.success !== 1) changeError(true);
    else {
      changeError(false);
      changeRedirect(true);
    }
  }

  async function checkAuthentication() {
    const { data } = await axios.get('/checkAuthentication');
    if(data.success === 1) {
      changeRedirect(true);
    }
  }

  function handleUsernameChange(event) {
    changeUsername(event.target.value);
  }
  function handlePasswordChange(event) {
    changePassword(event.target.value)
  }

  return(
    <div className={styles.pageWrapper}>
      {redirect && <Redirect to='/admin' />}
      <Card className={styles.loginBox} raised>
      <CardMedia
          className={styles.media}
          image={bealeImage}
          title="Beale Street"
        />
        <CardContent>
          <p className={styles.headerText}>Admin Login</p>
          { showError && <p className={styles.errorMessage}>*Login credentials invalid</p> }
          <TextField
          required
          id="outlined-required"
          label="Username"
          className={styles.inputStyle}
          margin="normal"
          variant="outlined"
          onChange={handleUsernameChange}
          name='username'
          value={username}
        />
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          className={styles.inputStyle}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
          name='password'
          onChange={handlePasswordChange}
          value={password}
        />
        <div className={styles.buttonDivStyle}>
        <Button variant="contained" color="primary" className={styles.buttonStyle} onClick={loginPressed}>
          Login
        </Button>
        </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminLogin;