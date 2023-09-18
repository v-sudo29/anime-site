import React from 'react'
import ReadMoreBtn from '../../components/ReadMoreBtn'
import styles from '../../styles/news/HeroContent.module.css'
import { useMobile } from '../../context/mobileContext'
import { Featured } from '../../types/fetchDataTypes/fetchNewsTypes'

export default function HeroContent({ featuredData } : { featuredData: Featured }) {
  const { isMobile } = useMobile()
  
  if (featuredData) return (
    <div className={styles.container}>
      <a className={styles.anchorContainer} href={featuredData.url} target="_blank" rel="noopener noreferrer">
        <img className={styles.heroImage} src={featuredData.image} alt="" />
      </a>
      <div className={styles.heroInfo}>
        <div className={styles.heroText}>
          {!isMobile && (
            <>
              <div className={styles.date}>{featuredData.date}</div>
              <h2 className={styles.title}>{featuredData.title}</h2>  
            </>
          )}
          {isMobile && (
            <>
              <h2 className={styles.title}>{featuredData.title}</h2>  
              <div className={styles.date}>{featuredData.date}</div>
            </>
          )}
        </div>
        <div className={styles.moreBtnContainer}>
          {!isMobile && <ReadMoreBtn url={featuredData.url} />}
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
          <h2 className={styles.title}>Loading...</h2>
        </div>
        <ReadMoreBtn url={''}/>
      </div>
    </div>
  )
}
