import React from 'react'
import { SimilarDatum } from '../../types/fetchDataTypes/fetchSimilarTypes'

interface ISimilarCard {
  styles: CSSModuleClasses
  anime: SimilarDatum
}

export default function SimilarCard({ styles, anime }: ISimilarCard) {
  return (
    <div key={anime['entry']['title']} className={styles.similarCard}>
      <a className={styles.anchorContainer} href={`/anime/${anime['entry']['mal_id']}`}>
        <img className={styles.similarImg} src={anime['entry']['images']['jpg']['large_image_url']} alt=""/>
      </a>
      <a href={`/anime/${anime['entry']['mal_id']}`}>
        <div className={styles.similarName}>{anime['entry']['title']}</div>
      </a>
    </div>
  )
}
