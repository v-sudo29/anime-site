import React, { useState, useEffect } from 'react'
import useFetchProducers from '../../hooks/useFetchProducers'
import ProducerCard from './ProducerCard'
import styles from '../../styles/anime-detail/StudioProducers.module.css'
import { IProducersIdsType } from '../../types/stateTypes/AnimeDetailTypes'
import { AnimeDetailData } from '../../types/fetchDataTypes/fetchAnimeDetailTypes'

interface IStudioProducers {
  anime: AnimeDetailData
  count: number
  countUpdated: boolean
}

export default function StudioProducers({ anime, count, countUpdated } : IStudioProducers) {
  const [producerIdsType, setProducerIdsType] = useState<IProducersIdsType[] | null>(null)
  const { producersData } = useFetchProducers(producerIdsType, count, countUpdated)
  let producerCards: JSX.Element[] = []

  // Set studio and producer ids
  useEffect(() => {
    if (anime) 
      setProducerIdsType(anime.studios.map(studio => ({
        id: studio['mal_id'],
        type: 'Studio' 
      })))
      setProducerIdsType(prev => {
        const prodIds = anime.producers.map(producer => ({
          id: producer['mal_id'],
          type: 'Producer'
        }))
        if (prev) return [...prev, ...prodIds]
        else return null
      })
  }, [anime])

  if (producersData && producersData.length > 0) 
    producerCards = producersData.map((producer, index) => (
      <ProducerCard
        key={`${producer.name}-${anime}-${index}`}
        anime={anime}
        styles={styles}
        producer={producer}
      />
    ))
  
  return (
    <div className={`${styles.studioProducersContainer} studioProducers`}>
      <h2 className={styles.sectionTitle}>Studios & Producers</h2>
      {producerCards.length > 0 ?
        <div className={styles.producerCardsContainer}>
          {producerCards}
        </div>
      : <p className={styles.defaultText}>No producers known at this time.</p>}
    </div>
  )
}
