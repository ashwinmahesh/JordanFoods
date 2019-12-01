import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Button, Modal, TextField } from '@material-ui/core';

function getModalStyle() {
  const top = 50;

  return {
    top: `${top}%`,
    margin: 'auto'
  };
}

const useStyles = makeStyles(theme => ({
  buttonStyle: {
    width: '200px',
    marginLeft: '5px',
    marginRight: '5px'
  },
  modalStyle: {
    width: '450px',
    background: 'rgb(242, 242, 242)',
    padding: '25px',
    borderRadius: '20px'
  },
  headerText: {
    fontSize: '16pt',
    fontWeight: 'bold',
    margin:'0px',
    textAlign: 'center',
    color: 'rgb(145, 44, 44)'
  },
  inputStyle: {
    width: '450px',
    background: 'white',
  },
  buttonDivStyle: {
    textAlign: 'center',
    display: 'block',
    marginTop: '20px'
  },
}));

function Admin() {
  const styles = useStyles();
  const [redirectToLogin, changeLoginRedirect] = useState(false);
  const [menuItems, changeMenuItems] = useState({});
  const [showOverlay, changeOverlayState] = useState(false);
  const [modalStyle] = useState(getModalStyle);

  const [itemName, changeItemName] = useState('');
  const [price, changePrice] = useState('');
  const [description, changeDescription] = useState('')

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

  async function fetchMenu() {
    const { data } = await axios.get('/fetchMenu');
    if(data.success === 1) {
      changeMenuItems(data.menu);
    }
  }

  useEffect(() => {
    // checkAuthentication();
    fetchMenu();
  })

  function addItemPressed() {
    console.log("pressing")
    changeOverlayState(true);
  }

  function handleNameChange(event) {
    console.log("new name:",event.target.value)
    changeItemName(event.target.value);
  }
  function handlePriceChange(event) {
    console.log("new price:",event.target.value)
    changePrice(event.target.value);
  }
  function handleDescriptionChange(event) {
    console.log("new description:",event.target.value)
    changeDescription(event.target.value);
  }

  function resetInputs() {
    changeItemName('');
    changeDescription('');
    changePrice('')
  }

  function createPressed() {
    changeOverlayState(false);
    resetInputs();
  }
  function cancelPressed() {
    changeOverlayState(false);
    resetInputs();
  }

  const items = Object.keys(menuItems).map((key, index) => 
    <p>{key} - {menuItems[key]['price']}: {menuItems[key]['description']}</p>
  )

  function renderModal() {
    return (
      <Modal open={showOverlay} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={modalStyle} className={styles.modalStyle}>
          <p className={styles.headerText}>Add Item</p>
          <TextField
          required
          id="outlined-required"
          label="Item Name"
          className={styles.inputStyle}
          margin="normal"
          variant="outlined"
          onChange={handleNameChange}
          name='itemName'
          value={itemName}
        />
        <TextField
          required
          id="outlined-number"
          label="Price ($)"
          type="number"
          className={styles.inputStyle}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          variant="outlined"
          value={price}
          onChange={handlePriceChange}
        />
        <TextField
          required
          id="outlined-textarea"
          label="Description"
          placeholder="Description of Item"
          multiline
          className={styles.inputStyle}
          margin="normal"
          variant="outlined"
          value={description}
          onChange={handleDescriptionChange}
        />
        <div className={styles.buttonDivStyle}>
          <Button variant="contained" className={styles.buttonStyle} onClick={createPressed}>CANCEL</Button>
          <Button variant="contained" color="primary" className={styles.buttonStyle} onClick={createPressed}>CREATE</Button>
        </div>
        </div>
      </Modal>
    );
  }

  return(
    <div>
      {renderModal()}
      { redirectToLogin && <Redirect to='/admin/login' /> }
      {items}
      <Button variant="contained" color="primary" className={styles.buttonStyle} onClick={addItemPressed}>Add Item</Button>
    </div>
  )
}

export default Admin;