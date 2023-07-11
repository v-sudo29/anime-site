import React, { useState, useEffect, useRef } from 'react'
import styles from '../../styles/anime-detail/StudioProducers.module.css'

export default function StudioProducers({anime, count, countUpdated}) {
  const [producerIdsType, setProducerIdsType] = useState(null)
  const [producersInfo, setProducersInfo] = useState([])
  const [cards, setCards] = useState(null)
  const intervalCounter = useRef(0)

  // Set studio and producer ids
  useEffect(() => {
    if (anime) {
      setProducerIdsType(anime.studios.map(studio => ({id: studio['mal_id'], type: 'Studio'})))
      setProducerIdsType(prev => {
        const prodIds = anime.producers.map(producer => ({id: producer['mal_id'], type: 'Producer'}))
        return [...prev, ...prodIds]
      })
    }
  }, [anime])

  // Set delayed timer and interval to fetch producers info
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const interval = setTimeout(() => setInterval(() => {
      if (producerIdsType && intervalCounter.current < producerIdsType.length && countUpdated) {
        const index = intervalCounter.current

        fetch(`https://api.jikan.moe/v4/producers/${producerIdsType[index]['id']}`,{
          signal: signal
        })
          .then(response => {
            if (response.ok) return response.json()
            throw response
          })
          .then(data => setProducersInfo(prev => [...prev, 
            {
              type: producerIdsType[index]['type'],
              name: data.data['titles'][0]['title'] ? data.data['titles'][0]['title'] : '-',
              image: data.data['images']['jpg']['image_url'],
              url: data.data['url']
            }]
          ))
          .catch(() => {
            if (signal.aborted) {
              console.log('The user aborted the request')
            } else {
              console.error('The request failed')
            }
          })
          .finally(() => intervalCounter.current += 1)
      } window.clearInterval(interval)
    }, (count > 0 ? 1800 : 1400)), (((count + 1) * 3000) + 1000))

    return () => {
      clearInterval(interval)
      controller.abort()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [producerIdsType, countUpdated])

  // Set producer cards
  useEffect(() => {
    if (producersInfo.length > 0) {
      setCards(producersInfo.map(producer => {
        return (
          <div key={producer.name} className={styles.producerCard}>
            <a href={producer.url} target="_blank" rel="noopener noreferrer">
              <img className={styles.producerImg} src={producer.image} alt="" />
            </a>
            <div className={styles.producerType}>{producer.type}</div>
            <a href={producer.url} target="_blank" rel="noopener noreferrer">
              <div className={styles.producerName}>{producer.name}</div>
            </a>
          </div>
        )
      }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [producersInfo])

  return (
    <div className={`${styles.studioProducersContainer} studioProducers`}>
      <h2 className={styles.sectionTitle}>Studios & Producers</h2>
      {cards ?
        <div className={styles.producerCardsContainer}>
          {cards}
        </div>
      : <p className={styles.defaultText}>No producers known at this time.</p>}
    </div>
  )
}
