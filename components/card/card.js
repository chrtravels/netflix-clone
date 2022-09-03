import styles from './card.module.css'
import Image from 'next/image';
import { useState } from 'react';

const Card = (props) => {

  const { imgUrl = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80", size = "medium" } = props;

  const [imgSrc, setImgSrc] = useState(imgUrl);
  const classMap = {
    'large': styles.lgItem,
    'medium': styles.mdItem,
    'small': styles.smItem
  }

  const handleOnError = () => {
    console.log('test');
    setImgSrc("https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80");
  }

  return (

    <div className={styles.container}>
      Card
      <div className={classMap[size]}>
        <Image
          src={imgSrc}
          alt="image"
          layout='fill'
          onError={handleOnError}
          className={styles.cardImg}
        />
      </div>
    </div>
  )
}

export default Card;
