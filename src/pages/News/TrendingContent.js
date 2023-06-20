import React, { useState, useEffect } from 'react'
import styles from '../../styles/news/TrendingContent.module.css'

export default function TrendingContent({trendingNews}) {
  const [trendingNewsCards, setTrendingNewsCards] = useState(null)

  // Set trending news cards when data available
  useEffect(() => {
    if (trendingNews) {
      setTrendingNewsCards(trendingNews.map((news, index) => {
        return (
          <div key={news.title + index} className={styles.card}>
            <img src={news.image} alt="" />
            <div className={styles.info}>
              <div>{news.date}</div>
              <h3>{news.title}</h3>
            </div>
          </div>
        )
      }))
    }
  }, [trendingNews])


  return (
    <div className={styles.container}>
      <h2>Trending Anime News</h2>
      <div className={styles.cardsContainer}>
        {trendingNewsCards ? trendingNewsCards : <div className={styles.defaultDiv}>...Loading</div>}
      </div>
    </div>
  )
}
