import styles from './card.module.css'
import Image from 'next/image';
import { useState } from 'react';

import cls from 'classnames';
import { motion } from "framer-motion"

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
      <motion.div className={cls(styles.imgMotionWrapper, classMap[size])} whileHover={{ scale: 1.2 }}>
        <Image
          src={imgSrc}
          alt="image"
          layout='fill'
          onError={handleOnError}
          className={styles.cardImg}
        />
      </motion.div>
    </div>
  )
}

export default Card;
