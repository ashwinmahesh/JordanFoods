import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

type Props = {
  name: string,
  description: string,
  image: string,
  price: string
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
  }
}));

function MenuItem(props: Props) {
  const styles = useStyles();

  return(
    <div className={styles.itemWrapper}>
      <img src={props.image} className={styles.itemImage} alt={props.name}/>
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