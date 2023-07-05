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

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${params.id}/full`)
      .then(response => response.json())
      .then(data => {
        setAnime(data.data)
        document.title = data.data.title
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(anime)
  return (
    <div className={styles.detailPage}>
      <div className={styles.backgroundImg}></div>
      {(anime 
        ? <div className={styles.content}>
            <HeroContent styles={styles} anime={anime}/>
            <NavButtons styles={styles}/>
            <Stats styles={styles} anime={anime}/>
            <Summary styles={styles} anime={anime}/>
            <Characters styles={styles} anime={anime} id={params.id}/>
            <RelatedAnime styles={styles} anime={anime}/>
            <StudioProducers styles={styles} anime={anime}/>
            <News styles={styles} id={params.id}/>
            <SimilarAnime styles={styles} id={params.id}/>
          </div>
        : <LoaderAnimation/>
      )}
    </div>
  )
}

export default AnimeDetail