import React, { useState, useEffect} from 'react'
import limitCharacters from '../../helpers/limitCharacters'
import styles from '../../styles/news/AllNews.module.css'

export default function AllNews({newsData}) {
  const [newsCards, setNewsCards] = useState(null)

  // Set news cards when data available
  useEffect(() => {
    if (newsData) {
      setNewsCards(newsData.map((news, index) => {
        if (news.image === 'doesn\'t exist!') {
          return null
        }
        return (
          <div key={index} className={styles.card}>
            <a className={styles.anchorContainer} href={news.url} target="_blank" rel="noopener noreferrer">
              <img className={styles.image} src={news.image} alt={news.title} />
            </a>
            <div className={styles.info}>
              <div className={styles.date}>{news.date}</div>
              <h3 className={styles.title}>{news.title}</h3>
              <p className={styles.text}>{limitCharacters(news.text)}</p>
            </div>
          </div>
        )
      }))
    }
  }, [newsData])

  return (
    <div className={styles.container}>
      <h2>What's New?</h2>
      <div className={styles.cardsContainer}>
        {newsCards ? newsCards : <>...Loading</>}
      </div>
    </div>
  )
}
