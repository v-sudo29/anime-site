import React, { useState, useEffect } from 'react'
import styles from '../../styles/news/TrendingContent.module.css'
import formatYesterdayDate from '../../helpers/formatYesterdayDate'
import getTodaysDate from '../../helpers/getTodaysDate'
import { useMobile } from '../../context/mobileContext'
import { News } from '../../types/fetchDataTypes/fetchNewsTypes'

export default function TrendingContent({ newsData } : { newsData: News[] }) {
  const [trendingNewsCards, setTrendingNewsCards] = useState<(JSX.Element | null)[] | null>(null)
  const { isMobile } = useMobile()

  const sortTrending = (news: News[]): News[] => {
    const newsCopy = [...news]

    const sortedNews = newsCopy.sort((a, b) => {
      const commentsA = a.comments
      const commentsB = b.comments

      if (commentsA > commentsB) return -1
      else if (commentsB > commentsA) return 1
      else return 0
    })
    return sortedNews
  }

  // Set trending news cards when data available
  useEffect(() => {
    if (newsData) {
      const sortedData = sortTrending(newsData)

      setTrendingNewsCards(sortedData.map((news, index) => {
        if (index < 3) {
          return (
            <div key={news.title + index} className={styles.card}>
              <a className={styles.anchorContainer} href={news.url} target="_blank" rel="noopener noreferrer">
                <img className={styles.image} src={news.image} alt="" />
              </a>
              <div className={styles.info}>
                <div className={styles.date}>
                {(news.date.includes('hour') || news.date.includes('minute')) ? getTodaysDate() :
                  news.date.includes('Yesterday') ? formatYesterdayDate() :
                  news.date
                }
                </div>
                {!isMobile && (
                  <a href={news.url} target="_blank" rel="noopener noreferrer">
                    <h3 className={styles.title}>{news.title}</h3>
                  </a>
                )}
              </div>
            </div>
          )
        } return null
      }))
    }
  }, [newsData, isMobile])


  return (
    <div className={styles.container}>
      <h2>Trending Anime News</h2>
      <div className={styles.cardsContainer}>
        {trendingNewsCards ? trendingNewsCards : <div className={styles.defaultDiv}>...Loading</div>}
      </div>
    </div>
  )
}
