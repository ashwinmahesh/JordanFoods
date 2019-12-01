import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Button, Modal, TextField } from '@material-ui/core';
import MenuItem from './menuItem'

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
    color: 'rgb(145, 44, 44)',
    fontFamily: 'McLaren, cursive'
  },
  inputStyle: {
    width: '450px',
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
  },
  mainError: {
    fontStyle: 'italic',
    color: 'red'
  },
  pageWrapper: {
    paddingLeft: '35px',
    paddingRight: '35px',
  },
  pageHeader: {
    fontSize: '20pt',
    fontWeight: 'bold',
    margin: '0px',
    marginBottom: '5px',
    textAlign: 'center',
    marginTop: '15px',
    fontFamily: 'McLaren, cursive'
  },
  addItemButton: {
    width: '350px',
    fontSize: '14pt',
    marginBottom: '20px'
  },
  subtext: {
    fontSize: '12pt',
    fontStyle: 'italic',
    margin: '0px',
    marginBottom: '10px',
    textAlign: 'center'
  }
}));

function Admin() {
  const styles = useStyles();

  //Redirection and fetching menu items
  const [redirectToLogin, changeLoginRedirect] = useState(false);
  const [menuItems, changeMenuItems] = useState({});
  const [showOverlay, changeOverlayState] = useState(false);
  const [modalStyle] = useState(getModalStyle);

  //Item values for modal
  const [itemName, changeItemName] = useState('');
  const [price, changePrice] = useState('');
  const [description, changeDescription] = useState('')
  const [image, changeImage] = useState(false);
  const [imageName, changeImageName] = useState('');

  //Error messages for modal
  const [nameErr, changeNameErr] = useState(false);
  const [priceErr, changePriceErr] = useState(false);
  const [descErr, changeDescErr] = useState(false)
  const [imgErr, changeImgErr] = useState(false)
  const [mainErr, showMainErr] = useState(false);

  //Edit modal display
  const [editItem, changeEditItem] = useState('')
  const [showEditModal, changeEditModalState] = useState(false)

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
    changeItemName(event.target.value);
  }
  function handlePriceChange(event) {
    changePrice(event.target.value);
  }
  function handleDescriptionChange(event) {
    changeDescription(event.target.value);
  }
  function handleImageChange(event) {
    changeImage(event.target.files[0])
    changeImageName(event.target.files[0].name)
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

    showMainErr(false);

    changeEditItem('');
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
      let sendData = new FormData();
      sendData.append('image', image)
      sendData.append('name', itemName)
      sendData.append('price', price)
      sendData.append('description', description);
      const { data } = await axios.post('/addItem', sendData)

      if(data.success === 1) {
        resetInputs();
        changeOverlayState(false);
        fetchMenu();
      }
      else {
        showMainErr(true);
      }
    }
    
  }
  function cancelPressed() {
    changeOverlayState(false);
    changeEditModalState(false);
    resetInputs();
  }

  function truncatedFileName() {
    if(imageName.length > 27) {
      return imageName.substr(0, 27) + '...';
    }
    return imageName;
  }

  function editItemCallback(editItemName) {
    changeEditItem(editItemName);

    changeImageName(menuItems[editItemName].imagePath)
    changeItemName(editItemName);
    changeDescription(menuItems[editItemName].description)
    changePrice(menuItems[editItemName].price)
    changeImage(true);

    changeEditModalState(true);
  }

  async function removeItem(name) {
    const { data } = await axios.post('/removeItem', {name});
    if(data.success === 1) {
      fetchMenu();
    }
  }

  async function confirmEdit() {
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
      let data;

      if(imageName === menuItems[editItem].imagePath) {
        const sendData = { name: itemName, price, description }
        const response = await axios.post(`/editItem/withoutImage/${editItem}`, sendData);
        data = response.data;
      }
      else {
        let sendData = new FormData();

        sendData.append('image', image)
        sendData.append('name', itemName)
        sendData.append('price', price)
        sendData.append('description', description);

        const response = await axios.post(`/editItem/withImage/${editItem}`, sendData);
        data = response.data;
      }

      if(data.success === 1) {
        resetInputs();
        changeEditModalState(false);
        fetchMenu();
      }
      else {
        showMainErr(true);
      }
    }
  }

  const items = Object.keys(menuItems).map((key, index) => {
    const item = menuItems[key]
    return <MenuItem key={key} name={key} price={item.price} description={item.description} imagePath={item.imagePath} editItem={editItemCallback} removeItem={removeItem}></MenuItem>
  })

  function renderModal() {
    return (
      <Modal open={showOverlay} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={modalStyle} className={styles.modalStyle}>
          <p className={styles.headerText}>Add Item</p>
          { mainErr && <p className={styles.mainError}>There was an error completing this request.</p> }
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

  function renderEditModal() {
    return (
      <Modal open={showEditModal} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={modalStyle} className={styles.modalStyle}>
          <p className={styles.headerText}>Edit {editItem}</p>
          { mainErr && <p className={styles.mainError}>There was an error completing this request.</p> }
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
          <Button variant="contained" color="primary" className={styles.buttonStyle} onClick={confirmEdit}>CONFIRM EDIT</Button>
        </div>
        </div>
      </Modal>
    );
  }

  return(
    <div className={styles.pageWrapper}>
      {renderModal()}
      {renderEditModal()}
      { redirectToLogin && <Redirect to='/admin/login' /> }
      <p className={styles.pageHeader}>Current Menu Items</p>
      <p className={styles.subtext}>Click on an image to edit that item</p>
      {items}
      <div className={styles.buttonDivStyle}>
        <Button variant="contained" color="primary" className={styles.addItemButton} onClick={addItemPressed}>Add Item</Button>
      </div>
    </div>
  )
}

export default Admin;