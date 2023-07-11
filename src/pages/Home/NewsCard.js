import React from 'react'
import styles from '../../styles/home/news/NewsCard.module.css'
import imageOnError from '../../helpers/imageOnError'
import formatYesterdayDate from '../../helpers/formatYesterdayDate.js'

export default function NewsCard({news}) {

  return (
    <div className={styles.newsCard}>
      <a className={styles.anchorContainer} href={news.url} target="_blank" rel="noopener noreferrer">
        <img 
          onError={imageOnError}
          className={styles.image} 
          src={`${news.image}`} alt="" 
        />
      </a>
      <span className={styles.date}>{
        news.date.includes('Yesterday') ? formatYesterdayDate() : news.date
      
      }</span>
      <a href={news.url} target="_blank" rel="noopener noreferrer">
        <h3 className={styles.title}>{news['title']}</h3>
      </a>
    </div>
  )
}
