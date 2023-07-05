import React, { useState, useEffect } from 'react'

export default function RelatedAnime({styles, anime}) {
  const [mainIdsType, setMainIds] = useState([])
  const [mainInfo, setMainInfo] = useState([])
  const [spinoffIds, setSpinOffIds] = useState([])
  const [spinoffInfo, setSpinOffInfo] = useState([])
  const [mainCards, setMainCards] = useState([])
  const [spinoffCards, setSpinoffCards] = useState([])

  // Set mainIds and spinOffIds based on relation
  useEffect(() => {
    if (anime) {
      anime.relations.forEach(relation => {
        if (relation['relation'] === 'Sequel') {
          const sequelsArr = relation['entry'].map(entry => ({id: entry['mal_id'], type: 'Sequel'}))
          setMainIds(prev => [...prev, ...sequelsArr])
        }
        else if (relation['relation'] === 'Prequel') {
          const prequelsArr = relation['entry'].map(entry => ({id: entry['mal_id'], type: 'Prequel'}))
          setMainIds(prev => [...prev, ...prequelsArr])
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
    if (mainIdsType.length > 0) {
      mainIdsType.map((info, index) => {
        setTimeout(() => {
          fetch(`https://api.jikan.moe/v4/anime/${info.id}`)
            .then(res => res.json())
            .then(data => setMainInfo(prev => [...prev, {
              id: info.id,
              type: info.type,
              name: data.data['titles'][0]['title'] ? data.data['titles'][0]['title'] : null,
              image: data.data['images']['jpg']['large_image_url']
            }])) 
        }, (index + 1) * 2000)
        return null
      })
    }
  }, [mainIdsType])

  // Fetch spinOff info
  useEffect(() => {
    if (spinoffIds.length > 0) {
      spinoffIds.map((id, index) => {
        setTimeout(() => {
          fetch(`https://api.jikan.moe/v4/anime/${id}`)
            .then(res => res.json())
            .then(data => setSpinOffInfo(prev => [...prev, {
              id: id,
              name: data.data['titles'][0]['title'] ? data.data['titles'][0]['title'] : null,
              image: data.data['images']['jpg']['large_image_url']
            }]))
        }, (index + 1) * 3000)
        return null
      })
    }
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
      {mainCards.length > 0 || spinoffCards.length > 0 ?

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

          </div>
        </div>
      
      : null}
    </>
  )
}
