import React from 'react'
import { Link } from 'react-router-dom'
import yellowArrowIcon from '../assets/yellow-arrow-icon.png'
import styles from '../styles/components/ReadMoreBtn.module.css'

export default function ReadMoreBtn({ url } : { url: string }) {
  return (
    <div className={styles.container}>
      <Link to={url} tabIndex={-1} className={styles.link} target="_blank" rel="noopener noreferrer">
        <span>Read More</span>
        <img src={yellowArrowIcon} alt="arrow icon" />
      </Link>
    </div>
  )
}
