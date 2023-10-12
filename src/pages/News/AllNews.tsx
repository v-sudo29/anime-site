import React, { useState, useEffect} from 'react'
import limitCharacters from '../../helpers/limitCharacters'
import styles from '../../styles/news/AllNews.module.css'
import formatYesterdayDate from '../../helpers/formatYesterdayDate'
import getTodaysDate from '../../helpers/getTodaysDate'
import { useMobile } from '../../context/mobileContext'
import { News } from '../../types/fetchDataTypes/fetchNewsTypes'

export default function AllNews({ newsData } : { newsData: News[] }) {
  let newsCards: (JSX.Element | null)[] | null = null
  const { isMobile } = useMobile()

  if (newsData) {
    newsCards = newsData.map((news, index) => {
      if (news.image === 'doesn\'t exist!') return null
      return (
        <div key={index} className={styles.card}>
          <a className={styles.anchorContainer} href={news.url} target="_blank" rel="noopener noreferrer">
            <img className={styles.image} src={news.image} alt={news.title} />
          </a>
          <div className={styles.info}>
            <div className={styles.date}>
            {(news.date.includes('hour') || news.date.includes('minute')) ? getTodaysDate() :
              news.date.includes('Yesterday') ? formatYesterdayDate() :
              news.date
            }
            </div>
            <a href={news.url} target="_blank" rel="noopener noreferrer">
              <h3 className={styles.title}>{news.title}</h3>
            </a>
            <p className={styles.text}>{news.text}</p>
          </div>
        </div>
      )
    })
    newsCards = newsCards.filter(item => item !== null)
    if (newsCards.length % 2 !== 0) newsCards.pop()
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>What's New?</h2>
      <div className={styles.cardsContainer}>
        {newsCards ? newsCards : <>...Loading</>}
      </div>
    </div>
  )
}
