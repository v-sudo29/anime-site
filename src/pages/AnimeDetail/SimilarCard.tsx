import React from 'react'
import { SimilarDatum } from '../../types/fetchDataTypes/fetchSimilarTypes'

interface SimilarCardProps {
  styles: CSSModuleClasses
  anime: SimilarDatum
}

const SimilarCard = ({ styles, anime }: SimilarCardProps) => {
  return (
    <div key={anime['entry']['title']} className={styles.similarCard}>
      <a className={styles.anchorContainer} href={`/anime/${anime['entry']['mal_id']}`}>
        <img className={styles.similarImg} src={anime['entry']['images']['jpg']['large_image_url']} alt=""/>
      </a>
      <a href={`/anime/${anime['entry']['mal_id']}`}>
        <div className={styles.similarTitle}>{anime['entry']['title']}</div>
      </a>
    </div>
  )
}

export default SimilarCard