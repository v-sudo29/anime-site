import React from 'react'
import { Link } from 'react-router-dom'
import yellowArrowIcon from '../assets/yellow-arrow-icon.png'
import whiteArrowIcon from '../assets/arrow-icon.png'
import styles from '../styles/components/ReadMoreBtn.module.css'

const ReadMoreBtn = ({ url } : { url: string }) => {
  return (
    <div className={styles.container}>
      <Link to={url} tabIndex={-1} className={styles.link} target="_blank" rel="noopener noreferrer">
        <span className={styles.readMoreSpan}>Read More</span>
        <div className={styles.arrowsSlideshow}>
          <div className={styles.arrowsSlider}>
            <div className={`${styles.arrowsSlide} ${styles.whiteArrowSlide}`}>
              <img className={styles.whiteArrow} src={whiteArrowIcon} alt="White arrow icon" />
            </div>
            <div className={styles.arrowsSlide}>
              <img className={styles.yellowArrow} src={yellowArrowIcon} alt="Yellow arrow icon" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ReadMoreBtn