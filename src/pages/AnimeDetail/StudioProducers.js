import React, { useState, useEffect } from 'react'

export default function StudioProducers({styles, anime}) {
  const [producerIdsType, setProducerIdsType] = useState(null)
  const [producersInfo, setProducersInfo] = useState([])
  const [cards, setCards] = useState(null)

  useEffect(() => {
    if (anime) {
      // Set studio ids
      setProducerIdsType(anime.studios.map(studio => ({id: studio['mal_id'], type: 'Studio'})))

      // // Add producer ids
      setProducerIdsType(prev => {
        const prodIds = anime.producers.map(producer => ({id: producer['mal_id'], type: 'Producer'}))
        return [...prev, ...prodIds]
      })
    }
  }, [anime])

  useEffect(() => {
    if (producerIdsType) {
      try {
        producerIdsType.map((producer, index) => {

          setTimeout(() => {
            fetch(`https://api.jikan.moe/v4/producers/${producer['id']}`)
              .then(res => res.json())
              .then(data => setProducersInfo(prev => [...prev, 
                {
                  type: producer['type'],
                  name: data.data['titles'][0]['title'] ? data.data['titles'][0]['title'] : '-',
                  image: data.data['images']['jpg']['image_url'],
                  url: data.data['url']
                }]
              ))
          }, (index + producerIdsType.length) * 1000)
          return null
        })
      } catch (err) {console.error(err)}
    }
  }, [producerIdsType])

  useEffect(() => {
    if (producersInfo.length > 0) {
      setCards(producersInfo.map(producer => {
        return (
          <div key={producer.name} className={styles.producerCard}>
            <a href={producer.url} target="_blank" rel="noreferrer">
              <img className={styles.producerImg} src={producer.image} alt="" />
            </a>
            <div className={styles.producerType}>{producer.type}</div>
            <div className={styles.producerName}>{producer.name}</div>
          </div>
        )
      }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [producersInfo])

  return (
    <div className={`${styles.studioProducersContainer} studioProducers`}>
      <h2 className={styles.sectionTitle}>Studios & Producers</h2>
      <div className={styles.producerCardsContainer}>
        {cards}
      </div>
    </div>
  )
}
