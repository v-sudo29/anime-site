import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../../styles/home/news/LatestNews.module.css'
import yellowArrow from '../../assets/yellow-arrow-icon.png'
import { useMobile } from '../../context/mobileContext'
import { JSONNewsResponse } from '../../types/fetchDataTypes/fetchNewsTypes'
import NewsCard from './NewsCard'

export default function LatestNews({ newsData } : { newsData: JSONNewsResponse | null }) {
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
        <h2>Latest Anime News</h2>
        <Link className={styles.moreNewsLink} to='/news'>
          <span>More News</span>
          <img src={yellowArrow} alt="Yellow arrow icon" />
        </Link>
      </div>
      <div className={styles.cardsContainer}>
        { newsCards ?? <div className={styles.defaultDiv}></div> }
      </div>
    </section>
  )
}