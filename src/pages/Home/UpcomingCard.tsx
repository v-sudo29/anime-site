import React from 'react'
import styles from '../../styles/home/upcoming/UpcomingCard.module.css'
import { UpcomingDatum } from '../../types/fetchDataTypes/fetchUpcomingTypes'
import { Link } from 'react-router-dom'

const UpcomingCard = ({ anime } : { anime: UpcomingDatum }) => {
  const id = anime['mal_id']
  const imgSrc = anime['images']['jpg']['large_image_url']
  const englishTitle= anime['title_english']
  const defaultTitle = anime['title']

  return (
    <div className={styles.card}>
      <Link className={styles.anchorContainer} to={`/anime/${id}`}>
        <img className={styles.image} src={imgSrc} alt={`${englishTitle ?? defaultTitle}`} />
      </Link>
      <a href={`/anime/${id}`}>
        <h3 className={styles.title}>{englishTitle ?? defaultTitle}</h3>
      </a>
    </div>
  )
}

export default UpcomingCard