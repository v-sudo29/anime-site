import React from 'react'
import ReadMoreBtn from '../../components/ReadMoreBtn'
import styles from '../../styles/news/HeroContent.module.css'

export default function HeroContent() {

  return (
    <div className={styles.container}>
      <div className={styles.heroImage}></div>
      <div className={styles.heroInfo}>
        <div className={styles.heroText}>
          <div>March 21, 2020</div>
          <h2>Lorem ipsum dolor sit amet consectetur. Commodo elementum</h2>
        </div>
        <ReadMoreBtn />
      </div>
    </div>
  )
}
