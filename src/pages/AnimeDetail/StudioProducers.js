import React, { useState, useEffect } from 'react'
import useFetchProducers from '../../hooks/useFetchProducers'
import ProducerCard from './ProducerCard'
import styles from '../../styles/anime-detail/StudioProducers.module.css'

export default function StudioProducers({anime, count, countUpdated}) {
  const [producerIdsType, setProducerIdsType] = useState(null)
  const { producersData } = useFetchProducers(producerIdsType, count, countUpdated)
  let producerCards = []

  // Set studio and producer ids
  useEffect(() => {
    if (anime) 
      setProducerIdsType(anime.studios.map(studio => ({id: studio['mal_id'], type: 'Studio'})))
      setProducerIdsType(prev => {
        const prodIds = anime.producers.map(producer => ({id: producer['mal_id'], type: 'Producer'}))
        return [...prev, ...prodIds]
      })
  }, [anime])

  if (producersData && producersData.length > 0) 
    producerCards = producersData.map(producer => (
      <ProducerCard
        key={producer.name}
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
