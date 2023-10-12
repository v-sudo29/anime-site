import React from 'react'
import styles from '../../styles/home/news/LatestNews.module.css'
import yellowArrow from '../../assets/yellow-arrow-icon.png'
import whiteArrow from '../../assets/arrow-icon.png'
import NewsCard from './NewsCard'
import { Link } from 'react-router-dom'
import { useMobile } from '../../context/mobileContext'
import { JSONNewsResponse } from '../../types/fetchDataTypes/fetchNewsTypes'

const LatestNews = ({ newsData } : { newsData: JSONNewsResponse | null }) => {
  const { isMobile, isTablet } = useMobile()
  let newsCards: (JSX.Element | null)[] | null = null

  if (newsData) newsCards = newsData.news.map((news, index) => {
    if (isMobile && !isTablet && index < 3) {
      return (
        <NewsCard
          key={news.title}
          news={news}
        />
      )
    }
    if (isTablet && !isMobile && index < 4) {
      return (
        <NewsCard
          key={news.title}
          news={news}
        />
      )
    }
    if (!isMobile && !isTablet && index < 5) {
      return (
        <NewsCard
          key={news.title}
          news={news}
        />
      )
    }
    return null  
  })

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>Latest Anime News</h2>
        <Link className={styles.moreNewsLink} to='/news'>
          <span className={styles.moreNewsSpan}>More News</span>
          <div className={styles.arrowsSlideshow}>
            <div className={styles.arrowsSlider}>
              <div className={`${styles.arrowsSlide} ${styles.whiteArrowSlide}`}>
                <img className={styles.whiteArrow} src={whiteArrow} alt="White arrow icon" />
              </div>
              <div className={styles.arrowsSlide}>
                <img className={styles.yellowArrow} src={yellowArrow} alt="Yellow arrow icon" />
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div className={styles.cardsContainer}>
        { newsCards ?? <div className={styles.defaultDiv}></div> }
      </div>
    </section>
  )
}

export default LatestNews