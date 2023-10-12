import React from 'react'
import styles from '../../styles/home/news/NewsCard.module.css'
import imageOnError from '../../helpers/imageOnError'
import formatYesterdayDate from '../../helpers/formatYesterdayDate.js'
import limitCharacters from '../../helpers/limitCharacters'
import getTodaysDate from '../../helpers/getTodaysDate'
import { useMobile } from '../../context/mobileContext'
import { News } from '../../types/fetchDataTypes/fetchNewsTypes'

const NewsCard = ({ news } : { news: News }) => {
  const { isMobile } = useMobile()

  return (
    <div className={styles.newsCard}>
      <a className={styles.anchorContainer} href={news.url} target="_blank" rel="noopener noreferrer">
        <img 
          onError={imageOnError}
          className={styles.image} 
          src={`${news.image}`} alt="error"
        />
      </a>
      <div className={styles.titleAndDate}>
        {!isMobile && (
          <a href={news.url} className={styles.titleLink} target="_blank" rel="noopener noreferrer">
            <h3 className={styles.title}>{limitCharacters(news['title'], 40)}</h3>
          </a>
        )}
        <span className={styles.date}>
        {(news.date.includes('hour') || news.date.includes('minute')) ? getTodaysDate() :
          news.date.includes('Yesterday') ? formatYesterdayDate() : news.date
        }
        </span>
      </div>
    </div>
  )
}

export default NewsCard