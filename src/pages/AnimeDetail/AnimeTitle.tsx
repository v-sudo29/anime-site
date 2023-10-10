import React from 'react'
import styles from '../../styles/anime-detail/AnimeTitle.module.css'
import { AnimeDetailData } from '../../types/fetchDataTypes/fetchAnimeDetailTypes'

const AnimeTitle = ({ anime } : { anime: AnimeDetailData | null }) => {
  return (
    <h2 className={styles.animeTitle}>{anime?.title}</h2>
    )
}

export default AnimeTitle