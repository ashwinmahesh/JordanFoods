import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom'


const useStyles = makeStyles(theme => ({

}));

function Admin() {
  const styles = useStyles();
  const [redirectToLogin, changeLoginRedirect] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('loggedIn') != 'true')
      changeLoginRedirect(true);
  })

  return(
    <div>
      { redirectToLogin && <Redirect to='/admin/login' /> }
      <p>I am a Admin Component</p>
    </div>
  )
}

export default Admin;