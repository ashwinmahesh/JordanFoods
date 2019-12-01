import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


type Props = {
  name: string,
  description: string,
  imagePath: string,
  price: string,
  editItem: (itemName) => (void),
  removeItem: (itemName) => (void)
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
    '&:hover': {
      cursor: 'pointer'
    }
  },
  remove: {
    fontSize: '12',
    color: 'rgb(145, 44, 44)',
    marginLeft: '10px',
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));

function MenuItem(props: Props) {
  const styles = useStyles();

  function handleImageClick() {
    props.editItem(props.name);
  }

  function handleRemoveClicked() {
    const response = window.confirm("Are you sure you want to delete this item?")
    if(response) {
      props.removeItem(props.name);
    }
  }

  return(
    <div className={styles.itemWrapper}>
      <a onClick={handleImageClick} className={styles.imageAnchor}><img src={`http://localhost:8000/fetchImage/${props.imagePath}`} className={styles.itemImage} alt={props.name}/></a>
      <div className={styles.left}>
        <div className={styles.leftText}>
          <p className={styles.bigText}>{props.name} <span>${props.price}<a onClick={handleRemoveClicked} className={styles.remove}>X</a></span></p>
          <p className={styles.smallText}>{props.description}</p>
        </div>
      </div>
    </div>
  )
}

export default MenuItem;