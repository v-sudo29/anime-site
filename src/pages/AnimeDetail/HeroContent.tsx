import React from 'react'
import styles from '../../styles/anime-detail/HeroContent.module.css'
import { AnimeDetailData } from '../../types/fetchDataTypes/fetchAnimeDetailTypes'

export default function HeroContent({ anime } : { anime: AnimeDetailData }) {
  return (
    <div className={styles.heroContent}>
      <div className={styles.heroContainer}>
        <div className={styles.imgContainer}>
          <img className={styles.animeImg} src={`${anime.images.jpg['large_image_url']}`} alt="" />
          <div className={styles.animeScore}>{anime.score ? anime['score'].toString().length > 3 ? anime['score'].toString().substring(0, 3) : anime['score'] : '-'}</div>
        </div>
        <div className={styles.titleAndRank}>
          <h1 className={styles.title}>{anime.title}</h1>
          <div className={styles.rank} >#{anime.rank < 10 ? '0' + anime.rank : anime.rank}</div>
        </div>
      </div>
    </div>
  )
}
