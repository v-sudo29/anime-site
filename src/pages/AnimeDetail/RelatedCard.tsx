import React from 'react'
import { IMainData } from '../../types/stateTypes/AnimeDetailTypes'
import { ISpinoffData } from '../../types/stateTypes/AnimeDetailTypes'

interface RelatedCard {
  styles: CSSModuleClasses
  anime: IMainData | ISpinoffData
}

export default function RelatedCard({ styles, anime }: RelatedCard) {
  return (
    <div key={anime.name} className={styles.mainCard}>
      <a className={styles.anchorContainer} href={`/anime/${anime.id}`}>
        <img className={styles.mainImg} src={anime.image} alt={anime.name ?? ''} />
      </a>
      <div>
        <div className={styles.mainType}>{anime.type === 'spinoff' ? 'Spin-off' : 'Sequel'}</div>
        <a href={`/anime/${anime.id}`}>
          <div className={styles.mainName}>{anime.name}</div>
        </a>
      </div>
    </div>
  )
}
