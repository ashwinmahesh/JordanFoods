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
    // background: 'white',
  },
  buttonDivStyle: {
    textAlign: 'center',
    display: 'block',
    marginTop: '20px'
  },
  imageName: {
    display: 'inline-block',
    width: '275px',
    marginLeft: '20px',
    fontStyle: 'italic'
  },
  uploadImageButton: {
    marginTop: '10px'
  },
  imageErrorMsg: {
    display: 'inline-block',
    width: '275px',
    marginLeft: '20px',
    fontStyle: 'italic',
    color: 'red'
  }
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
  const [image, changeImage] = useState(false);

  const [nameErr, changeNameErr] = useState(false);
  const [priceErr, changePriceErr] = useState(false);
  const [descErr, changeDescErr] = useState(false)
  const [imgErr, changeImgErr] = useState(false)

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
    checkAuthentication();
    fetchMenu();
  }, [])

  function addItemPressed() {
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
  function handleImageChange(event) {
    console.log("new image:", event.target.files[0]);
    changeImage(event.target.files[0])
    console.log(event.target.files[0].name)
  }

  function resetInputs() {
    changeItemName('');
    changeDescription('');
    changePrice('');
    changeImage(false);

    changeNameErr(false);
    changePriceErr(false)
    changeDescErr(false);
    changeImgErr(false);
  }

  async function createPressed() {
    changeNameErr(itemName === '');
    changePriceErr(price === '')
    changeDescErr(description === '');
    changeImgErr(image === false);
    
    let hasErr = false;
    if(itemName === '' || price === '' || description === '' || image === false){
      hasErr = true;
      return;
    }
    if(hasErr === false){
      // changeOverlayState(false);
      console.log("Image", image)
      const { data } = await axios.post('/addItem', {name: itemName, price, description, image});
      console.log(data)
      // resetInputs();
    }
    
  }
  function cancelPressed() {
    changeOverlayState(false);
    resetInputs();
  }

  function truncatedFileName() {
    if(image.name.length > 27) {
      return image.name.substr(0, 27) + '...';
    }
    return image.name;
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
          error={nameErr && itemName===''}
          helperText='Food name is required.'
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
          error={priceErr && price===''}
          helperText='Price is required (X.XX)'
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
          error={descErr && description===''}
          helperText='Description of the food item. Also required'
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
        <div className={styles.uploadImageButton}>
          <Button variant='contained' component='label'>
            Upload Image
            <input type='file' style={{display: 'none'}} accept="image/*" name='image' onChange={handleImageChange}/>
          </Button>
          { image && <p className={styles.imageName}>{truncatedFileName()}</p> }
          { imgErr && !image && <p className={styles.imageErrorMsg}>Image is required.</p>}
        </div>
        
        <div className={styles.buttonDivStyle}>
          <Button variant="contained" className={styles.buttonStyle} onClick={cancelPressed}>CANCEL</Button>
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