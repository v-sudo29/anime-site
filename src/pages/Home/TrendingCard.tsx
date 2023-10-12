import React from 'react'
import filterTitle from "../../helpers/filterTitle"
import limitCharacters from '../../helpers/limitCharacters'
import ReadMoreBtn from '../../components/ReadMoreBtn'
import styles from '../../styles/home/trending/TrendingCard.module.css'
import { Link } from 'react-router-dom'
import { useMobile } from '../../context/mobileContext'
import { TrendingDatum } from '../../types/fetchDataTypes/fetchTrendingTypes'

const TrendingCard = ({ anime } : { anime: TrendingDatum }) => {
  const { isMobile } = useMobile()
  const id = anime['mal_id']
  const imgSrc = anime['images']['jpg']['large_image_url']
  const englishTitle = anime['title_english'] && filterTitle(anime['title_english'])
  const defaultTitle = anime['title'] && filterTitle(anime['title'])
  const synopsis = !isMobile ? limitCharacters(anime['synopsis']) : limitCharacters(anime['synopsis'], 200)

  return (
    <div className={styles.slide}>
      <div className={styles.card}>
        <Link className={styles.anchorContainer} tabIndex={-1} to={`/anime/${id}`}>
          <img className={styles.image} src={imgSrc} alt={`${englishTitle ?? defaultTitle}`}/>
        </Link>
        <div className={styles.info}>
          <h3 className={styles.title}>{englishTitle ?? defaultTitle}</h3>
          <p className={styles.synopsis}>{synopsis}</p>
          {!isMobile && <ReadMoreBtn url={`/anime/${id}`}/>}
        </div>
      </div> 
    </div>
  )
}

export default TrendingCard