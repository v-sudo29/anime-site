import React, { useState, useEffect, useRef } from 'react'

export default function RelatedAnime({
  styles, 
  anime, 
  mainIdsType, 
  spinoffIds, 
  setMainIdsType,
  setSpinOffIds
  }) {
  const [mainInfo, setMainInfo] = useState([])
  const [spinoffInfo, setSpinOffInfo] = useState([])
  const [mainCards, setMainCards] = useState([])
  const [spinoffCards, setSpinoffCards] = useState([])
  const intervalCounter = useRef(0)
  const intervalTwoCounter = useRef(0)

  // Set mainIds and spinOffIds based on relation
  useEffect(() => {
    if (anime) {
      anime.relations.forEach(relation => {
        if (relation['relation'] === 'Sequel') {
          const sequelsArr = relation['entry'].map(entry => ({id: entry['mal_id'], type: 'Sequel'}))
          setMainIdsType(prev => [...prev, ...sequelsArr])
        }
        else if (relation['relation'] === 'Prequel') {
          const prequelsArr = relation['entry'].map(entry => ({id: entry['mal_id'], type: 'Prequel'}))
          setMainIdsType(prev => [...prev, ...prequelsArr])
        }
        else if (relation['relation'] === 'Spin-off') {
          setSpinOffIds(relation['entry'].map(entry => entry['mal_id']))
        }
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anime])

  // Fetch main info
  useEffect(() => {
    const interval = setTimeout(() => setInterval(() => {
      if (mainIdsType.length > 0 && intervalCounter.current < mainIdsType.length) {
        const index = intervalCounter.current

        fetch(`https://api.jikan.moe/v4/anime/${mainIdsType[index]['id']}`)
            .then(res => res.json())
            .then(data => setMainInfo(prev => [...prev, {
              id: mainIdsType[index]['id'],
              type: mainIdsType[index]['type'],
              name: data.data['titles'][0]['title'] ? data.data['titles'][0]['title'] : null,
              image: data.data['images']['jpg']['large_image_url']
            }]))

        intervalCounter.current += 1
        } else {
          window.clearInterval(interval)
        }
      }, 1200), 2500)
      return () => clearInterval(interval)

  }, [mainIdsType])

  // Fetch spinOff info
  useEffect(() => {
    const interval = setTimeout(() => setInterval(() => {
      if (spinoffIds.length > 0 && intervalTwoCounter.current < spinoffIds.length) {
        const index = intervalTwoCounter.current

        fetch(`https://api.jikan.moe/v4/anime/${spinoffIds[index]}`)
          .then(res => res.json())
          .then(data => setSpinOffInfo(prev => [...prev, {
            id: spinoffIds[index],
            name: data.data['titles'][0]['title'] ? data.data['titles'][0]['title'] : null,
            image: data.data['images']['jpg']['large_image_url']
          }]))

        intervalTwoCounter.current += 1
      } else {
        window.clearInterval(interval)
      }
    }, 3500), 2500)
    return () => clearInterval(interval)
  }, [spinoffIds])

  // Set mainCards
  useEffect(() => {
    if (mainInfo.length > 0) {
      setMainCards(mainInfo.map(anime => {
        return (
          <div key={anime.name} className={styles.mainCard}>
            <a href={`/anime/${anime.id}`}>
              <img className={styles.mainImg} src={anime.image} alt="" />
            </a>
            <div className={styles.mainType}>{anime.type}</div>
            <div className={styles.mainName}>{anime.name}</div>
          </div>
        )
      }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainInfo])

  // Set spinoffCards
  useEffect(() => {
    if (spinoffInfo.length > 0) {
      setSpinoffCards(spinoffInfo.map(anime => {
        return (
          <div key={anime.name} className={styles.mainCard}>
            <a href={`/anime/${anime.id}`}>
              <img className={styles.mainImg} src={anime.image} alt="" />
            </a>
            <div className={styles.mainType}>{anime.type}</div>
            <div className={styles.mainName}>{anime.name}</div>
          </div>
        )
      }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinoffInfo])

  return (
    <>
        <div className={`${styles.relatedAnimeContainer} relatedAnime`}>
          <h2 className={styles.sectionTitle}>Related Anime</h2>
          <div className={styles.relatedContent}>
    
          {mainCards.length > 0 ? 
            <div className={styles.mainSeries}>
              <h3>Main Series</h3>
              <div className={styles.mainCardsContainer}>
                {mainCards}
              </div>
            </div> 
          : null}
    
          {spinoffCards.length > 0 ? 
            <div className={styles.spinOffs}>
            <h3>Spin-Offs</h3>
            <div className={styles.spinoffCardsContainer}>
              {spinoffCards}
            </div>
            </div> 
          : null}

          {(mainCards.length === 0 && spinoffCards.length === 0) && 'No related anime.'}

          </div>
        </div>
    </>
  )
}
