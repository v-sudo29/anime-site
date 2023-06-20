import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../../styles/home/news/LatestNews.module.css'

import arrowIcon from '../../assets/arrow-icon.png'

export default function LatestNews({newsCards}) {

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2>Latest Anime News</h2>
        <Link className='more-news-link' to='/news'>
          More News
          <img src={arrowIcon} alt="" />
        </Link>
      </div>
      <div className={styles.cardsContainer}>
        {newsCards ? newsCards : <div className='home-news-default-div'></div> }
      </div>
    </section>
  )
}