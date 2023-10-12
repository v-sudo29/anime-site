import React from 'react'
import styles from '../../styles/anime-detail/AnimeRank.module.css'
import { AnimeDetailData } from '../../types/fetchDataTypes/fetchAnimeDetailTypes'

const AnimeRank = ({ anime } : { anime: AnimeDetailData | null }) => {
  return <span className={styles.rank}>#{anime?.rank}</span>
}

export default AnimeRank