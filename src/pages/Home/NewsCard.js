import React from 'react'
import styles from '../../styles/home/news/NewsCard.module.css'

export default function NewsCard({news}) {
  return (
    <div className={styles.newsCard}>
      <a className={styles.anchorContainer} href={news.url} target="_blank" rel="noopener noreferrer">
        <img className={styles.image} src={`${news.image}`} alt="" />
      </a>
      <span className={styles.date}>{news.date}</span>
      <h3 className={styles.title}>{news['title']}</h3>
    </div>
  )
}
