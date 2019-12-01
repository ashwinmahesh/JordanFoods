import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import { Button } from '@material-ui/core';
// import axios from 'axios';

type Props = {
  name: string,
  description: string,
  imagePath: string,
  price: string,
  editItem: (itemName) => (void)
}

const useStyles = makeStyles(theme => ({
  itemWrapper: {
    marginBottom: '20px'
  },
  itemImage: {
    width: '150px',
    height: '150px',
    borderRadius: '10px'
  },
  left: {
    display: 'inline-block',
    width: '660px',
    verticalAlign: 'top',
    '& p': {
      margin: '0px'
    },
    marginLeft: '20px'
  },
  bigText: {
    fontWeight: 'bold',
    fontSize: '16pt',
    '& span': {
      float: 'right',
      fontSize: '22pt'
    },
    marginBottom: '20px',
    paddingBottom: '10px'
  },
  smallText: {
    fontSize: '13pt',
    fontStyle: 'italic',
    marginTop: '17px',
    width: '480px',
  },
  imageAnchor:{
    // border: 'none'
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));

function MenuItem(props: Props) {
  const styles = useStyles();
  // const [image, setImage] = useState(false);

  // async function fetchImage() {
  //   const data = await axios.get(`/fetchImage/${props.imagePath}`)
  //   // setImage(data)
  //   // console.log(data['data'])
  //   setImage(data['data'])
  // }
  function handleImageClick() {
    props.editItem(props.name);
  }

  useEffect(() => {
    // fetchImage();
  }, [])
  return(
    <div className={styles.itemWrapper}>
      <a onClick={handleImageClick} className={styles.imageAnchor}><img src={`http://localhost:8000/fetchImage/${props.imagePath}`} className={styles.itemImage} alt={props.name}/></a>
      <div className={styles.left}>
        <div className={styles.leftText}>
          <p className={styles.bigText}>{props.name} <span>${props.price}</span></p>
          <p className={styles.smallText}>{props.description}</p>
        </div>
      </div>
    </div>
  )
}

export default MenuItem;