import React, { useState, useEffect} from 'react'
import limitCharacters from '../../helpers/limitCharacters'
import styles from '../../styles/news/AllNews.module.css'
import formatYesterdayDate from '../../helpers/formatYesterdayDate.js'

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
            <div className={styles.testContainer}>
              <a className={styles.anchorContainer} href={news.url} target="_blank" rel="noopener noreferrer">
                <div className={styles.imageDiv}>
                  <img className={styles.image} src={news.image} alt={news.title} />
                </div>
              </a>
            </div>
            <div className={styles.info}>
              <div className={styles.date}>{news.date.includes('Yesterday') ? formatYesterdayDate() : news.date}</div>
              <a href={news.url} target="_blank" rel="noopener noreferrer">
                <h3 className={styles.title}>{limitCharacters(news.title, 20)}</h3>
              </a>
              <p className={styles.text}>{limitCharacters(news.text, 76)}</p>
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
