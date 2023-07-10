import React, { useState, useEffect } from 'react'
import styles from '../../styles/news/TrendingContent.module.css'

export default function TrendingContent({newsData}) {
  const [trendingNewsCards, setTrendingNewsCards] = useState(null)

  function sortTrending(news) {
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
                <div className={styles.date}>{news.date}</div>
                <a href={news.url} target="_blank" rel="noopener noreferrer">
                  <h3 className={styles.title}>{news.title}</h3>
                </a>
              </div>
            </div>
          )
        } return null
      }))
    }
  }, [newsData])


  return (
    <div className={styles.container}>
      <h2>Trending Anime News</h2>
      <div className={styles.cardsContainer}>
        {trendingNewsCards ? trendingNewsCards : <div className={styles.defaultDiv}>...Loading</div>}
      </div>
    </div>
  )
}
