import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Button } from '@material-ui/core';



const useStyles = makeStyles(theme => ({

}));

function Admin() {
  const styles = useStyles();
  const [redirectToLogin, changeLoginRedirect] = useState(false);

  async function testAxios() {
    const {data} = await axios.get('/test_route');
    console.log(data);
  }

  async function checkAuthentication() {
    const { data } = await axios.get('/checkAuthentication');
    if(data.success === 0) {
      changeLoginRedirect(true);
    }
  }

  useEffect(() => {
    checkAuthentication();
  })

  return(
    <div>
      { redirectToLogin && <Redirect to='/admin/login' /> }
      <Button onClick={testAxios}>Hello World</Button>
      <p>I am a Admin Component</p>
    </div>
  )
}

export default Admin;