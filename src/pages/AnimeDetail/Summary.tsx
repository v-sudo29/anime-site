import React from 'react'
import styles from '../../styles/anime-detail/Summary.module.css'
import { AnimeDetailData } from '../../types/fetchDataTypes/fetchAnimeDetailTypes'

export default function Summary({ anime } : { anime: AnimeDetailData }) {
  const genreTags = anime.genres.map(genre => {
    return (
      <span key={genre.name} className={styles.genreTag}>{genre.name}</span>
    )
  })
  
  return (
    <div className={styles.summaryContainer}>
      <h2 className={styles.sectionTitle}>Summary</h2>
      {anime.synopsis ? 
        <p className={styles.synopsis}>{anime.synopsis}</p>
      : <p className={styles.defaultText}>No summary at this time.</p> }
      <div className={styles.genreTagsContainer}>
        {genreTags}
      </div>
    </div>
  )
}
