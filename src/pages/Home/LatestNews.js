import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../../styles/home/news/LatestNews.module.css'
import yellowArrow from '../../assets/yellow-arrow-icon.png'
export default function LatestNews({ newsCards }) {

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2>Latest Anime News</h2>
        <Link className={styles.moreNewsLink} to='/news'>
          <span>More News</span>
          <img src={yellowArrow} alt="Yellow arrow icon" />
        </Link>
      </div>
      <div className={styles.cardsContainer}>
        { newsCards ?? <div className={styles.defaultDiv}></div> }
      </div>
    </section>
  )
}