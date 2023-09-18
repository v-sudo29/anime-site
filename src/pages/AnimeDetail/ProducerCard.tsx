import React from 'react'
import { AnimeDetailData } from '../../types/fetchDataTypes/fetchAnimeDetailTypes'
import { IProducersData } from '../../types/stateTypes/AnimeDetailTypes'

interface IProducerCard {
  anime: AnimeDetailData
  styles: CSSModuleClasses
  producer: IProducersData
}

export default function ProducerCard({ anime, styles, producer }: IProducerCard) {
  return (
    <div className={styles.producerCard}>
      <a className={styles.anchorContainer} href={producer.url} target="_blank" rel="noopener noreferrer">
        <img className={styles.producerImg} src={producer.image} alt="" />
      </a>
      <div className={styles.producerType}>{producer.type}</div>
      <a href={producer.url} target="_blank" rel="noopener noreferrer">
        <div className={styles.producerName}>{producer.name}</div>
      </a>
    </div>
  )
}
