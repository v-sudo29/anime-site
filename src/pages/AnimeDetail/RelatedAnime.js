import React, { useState, useEffect, useRef } from 'react'
import styles from '../../styles/anime-detail/RelatedAnime.module.css'

export default function RelatedAnime({
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
    const controller = new AbortController()
    const signal = controller.signal

    const interval = setTimeout(() => setInterval(() => {
      if (mainIdsType.length > 0 && intervalCounter.current < mainIdsType.length) {
        const index = intervalCounter.current

        try {
          fetch(`https://api.jikan.moe/v4/anime/${mainIdsType[index]['id']}`, {
            signal: signal
          })
            .then(response => {
              if (response.ok) return response.json()
              throw response
            })
            .then(data => setMainInfo(prev => [...prev, {
              id: mainIdsType[index]['id'],
              type: mainIdsType[index]['type'],
              name: data.data['titles'][0]['title'] ? data.data['titles'][0]['title'] : null,
              image: data.data['images']['jpg']['large_image_url']
            }]))
        } catch (error) {
          console.error(error)
        } finally {
          intervalCounter.current += 1 
        }  
      } else {
          window.clearInterval(interval)
        }
      }, 2500), 2500)
      return () => {
        clearInterval(interval)
        controller.abort()
      }

  }, [mainIdsType])

  // Fetch spinOff info
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const interval = setTimeout(() => setInterval(() => {
      if (spinoffIds.length > 0 && intervalTwoCounter.current < spinoffIds.length) {
        const index = intervalTwoCounter.current
        try {
          fetch(`https://api.jikan.moe/v4/anime/${spinoffIds[index]}`, {
            signal: signal
          })
            .then(response => {
              if (response.ok) return response.json()
              throw response
            })
            .then(data => setSpinOffInfo(prev => [...prev, {
              id: spinoffIds[index],
              name: data.data['titles'][0]['title'] ? data.data['titles'][0]['title'] : null,
              image: data.data['images']['jpg']['large_image_url']
            }]))
        } catch (error) {
          console.error(error)
        } finally {
          intervalTwoCounter.current += 1
        }
      } else {
        window.clearInterval(interval)
      }
    }, 2500), 5000)
    return () => {
      clearInterval(interval)
      controller.abort()
    }
  }, [spinoffIds])

  // Set mainCards
  useEffect(() => {
    if (mainInfo.length > 0) {
      setMainCards(mainInfo.map(anime => {
        return (
          <div key={anime.name} className={styles.mainCard}>
            <a className={styles.anchorContainer} href={`/anime/${anime.id}`}>
              <img className={styles.mainImg} src={anime.image} alt="" />
            </a>
            <div className={styles.mainType}>{anime.type}</div>
            <a href={`/anime/${anime.id}`}>
              <div className={styles.mainName}>{anime.name}</div>
            </a>
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
            <a href={`/anime/${anime.id}`}>
              <div className={styles.mainName}>{anime.name}</div>
            </a>
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

          {/* Main series */}
          {mainCards.length > 0 ? 
            <div className={styles.mainSeries}>
              <h3>Main Series</h3>
              <div className={styles.mainCardsContainer}>
                {mainCards}
              </div>
            </div> 
          : null}

          {/* Spin-Offs */}
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
