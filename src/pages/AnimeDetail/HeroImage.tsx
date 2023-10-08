import React from 'react'
import styles from '../../styles/anime-detail/HeroImage.module.css'
import { AnimeDetailData } from '../../types/fetchDataTypes/fetchAnimeDetailTypes'

const HeroImage = ({ anime } : { anime: AnimeDetailData | null }) => {
  return (
    <div className={styles.container}>
      <img className={styles.animeImg} src={`${anime?.images.jpg['large_image_url']}`} alt="" />
    </div>
  )
}

export default HeroImage