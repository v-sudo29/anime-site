import React from 'react'
import { Link } from 'react-router-dom'
import arrowIcon from '../assets/arrow-icon.png'
import styles from '../styles/components/ReadMoreBtn.module.css'

export default function ReadMoreBtn() {
  return (
    <div className={styles.container}>
      <Link className={styles.link}>
        Read More
        <img src={arrowIcon} alt="" />
      </Link>
    </div>
  )
}
