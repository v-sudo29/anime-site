import React from 'react'
import ReadMoreBtn from '../../components/ReadMoreBtn'
import styles from '../../styles/news/HeroContent.module.css'

export default function HeroContent({featuredData}) {
  if (featuredData) return (
    <div className={styles.container}>
      <a className={styles.anchorContainer} href={featuredData.url} target="_blank" rel="noopener noreferrer">
        <img className={styles.heroImage} src={featuredData.image} alt="" />
      </a>
      <div className={styles.heroInfo}>
        <div className={styles.heroText}>
          <div className={styles.date}>{featuredData.date}</div>
          <h2 className={styles.title}>{featuredData.title}</h2>
        </div>
        <div className={styles.moreBtnContainer}>
          <ReadMoreBtn url={featuredData.url} />
        </div>
      </div>
    </div>
  )
  
  if (!featuredData) return (
    <div className={styles.container}>
      <div className={styles.heroImage}></div>
      <div className={styles.heroInfo}>
        <div className={styles.heroText}>
          <div className={styles.date}></div>
          <h2 className={styles.title}>Lorem ipsum dolor sit amet consectetur. Commodo elementum</h2>
        </div>
        <ReadMoreBtn />
      </div>
    </div>
  )
}
