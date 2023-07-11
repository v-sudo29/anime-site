import React from 'react'
import { Link } from 'react-router-dom'
import arrowIcon from '../assets/arrow-icon.png'
import styles from '../styles/components/ReadMoreBtn.module.css'

export default function ReadMoreBtn({url}) {
  return (
    <div className={styles.container}>
      <Link to={url} tabIndex={-1} className={styles.link} target="_blank" rel="noopener noreferrer">
        Read More
        <img src={arrowIcon} alt="arrow icon" />
      </Link>
    </div>
  )
}
