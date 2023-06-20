import React from 'react'
import styles from '../../styles/home/news/NewsCard.module.css'

export default function NewsCard({news}) {
  return (
    <div className={styles.newsCard}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={`${news.image}`} alt="" />
      </div>
      <span className={styles.date}>{news.date}</span>
      <h3 className={styles.title}>{news['title']}</h3>
    </div>
  )
}
