import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoaderAnimation from '../../components/LoaderAnimation'
import styles from '../../styles/components/AnimeDetail.module.css'
import HeroContent from './HeroContent'
import NavButtons from './NavButtons'
import Stats from './Stats'
import Summary from './Summary'
import Characters from './Characters'
import RelatedAnime from './RelatedAnime'
import StudioProducers from './StudioProducers'
import News from './News'
import SimilarAnime from './SimilarAnime'

function AnimeDetail() {
  const params = useParams()
  const [anime, setAnime] = useState(null)
  const [mainIdsType, setMainIdsType] = useState([])
  const [spinoffIds, setSpinOffIds] = useState([])
  const [count, setCount] = useState(null)
  const [countUpdated, setCountUpdated] = useState(false)

  // Fetch anime data from Jikan API
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const timer = setTimeout(() => {
      fetch(`https://api.jikan.moe/v4/anime/${params.id}/full`, {
        signal: signal
      })
        .then(response => {
          if (response.ok) return response.json()
          throw response
        })
        .then(data => {
          setAnime(data.data)
          document.title = data.data.title
        })
    }, 100)
    return () => {
      clearTimeout(timer)
      controller.abort()
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update count states
  useEffect(() => {
    if (mainIdsType && spinoffIds) {
      setCount(mainIdsType.length + spinoffIds.length)
      setCountUpdated(true)
    }
  }, [mainIdsType, spinoffIds])

  return (
    <div className={`${styles.detailPage} overview`}>
      <div className={styles.backgroundImg}></div>
      {(anime 
        ? <div className={styles.content}>
            <HeroContent styles={styles} anime={anime}/>
            <NavButtons styles={styles}/>
            <Stats styles={styles} anime={anime}/>
            <Summary styles={styles} anime={anime}/>
            <Characters styles={styles} anime={anime} id={params.id}/>
            <RelatedAnime 
              styles={styles} 
              anime={anime}
              mainIdsType={mainIdsType}
              spinoffIds={spinoffIds}
              setMainIdsType={setMainIdsType}
              setSpinOffIds={setSpinOffIds}
            />
            <StudioProducers 
              styles={styles} 
              anime={anime}
              count={count}
              countUpdated={countUpdated}
            />
            <News styles={styles} id={params.id}/>
            <SimilarAnime styles={styles} id={params.id}/>
          </div>
        : <LoaderAnimation/>
      )}
    </div>
  )
}

export default AnimeDetail