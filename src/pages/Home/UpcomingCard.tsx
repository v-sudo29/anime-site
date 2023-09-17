import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../../styles/home/upcoming/UpcomingCard.module.css'

export default function UpcomingCard({anime}) {
  const id = anime['mal_id']
  const imgSrc = anime['images']['jpg']['large_image_url']
  const englishTitle= anime['title_english']
  const defaultTitle = anime['title']

  return (
    <div className={styles.card}>
      <Link className={styles.anchorContainer} to={`/anime/${id}`}>
        <img className={styles.image} src={imgSrc} alt="" />
      </Link>
      <a href={`/anime/${id}`}>
        <h3 className={styles.title}>{englishTitle ? englishTitle : defaultTitle}</h3>
      </a>
    </div>
  )
}