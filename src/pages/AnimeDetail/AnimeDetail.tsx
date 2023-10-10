import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoaderAnimation from '../../components/LoaderAnimation'
import styles from '../../styles/anime-detail/AnimeDetail.module.css'
import Stats from './Stats'
import Characters from './Characters'
import RelatedAnime from './RelatedAnime'
import StudioProducers from './StudioProducers'
import News from './News'
import SimilarAnime from './SimilarAnime'
import HeroImage from './HeroImage'
import HeroInfo from './HeroInfo'
import useFetchAnime from '../../hooks/useFetchAnime'
import FetchError from '../../components/FetchError'
import { useMobile } from '../../context/mobileContext'
import { IMainIdsType } from '../../types/stateTypes/AnimeDetailTypes'
import AnimeTitle from './AnimeTitle'
import ShowDetailsButton from './ShowDetailsButton'
import AnimeRank from '../../styles/anime-detail/AnimeRank'
import Synopsis from './Synopsis'

function AnimeDetail() {
  const params = useParams()
  const { anime, animeLoading, animeError } = useFetchAnime()
  const [mainIdsType, setMainIdsType] = useState<IMainIdsType[]>([])
  const [spinOffIds, setSpinOffIds] = useState<number[]>([])
  const [count, setCount] = useState<number>(0)
  const [countUpdated, setCountUpdated] = useState(false)
  const { isDetailMobile } = useMobile()

  // Update count states
  useEffect(() => {
    if (mainIdsType && spinOffIds) {
      setCount(mainIdsType.length + spinOffIds.length)
      setCountUpdated(true)
    }
  }, [mainIdsType, spinOffIds])

  // TODO: TEMPORARY useEffect
  useEffect(() => {
    const bodyElement = document.querySelector('body')
    if (bodyElement) bodyElement.style.backgroundColor = "#1F2021"
  }, [])

  if (animeLoading) return <LoaderAnimation/>
  if (animeError) return <FetchError/>
  if (anime) return (
    <div className={styles.content}>
      {/* BREAKPOINT for DESKTOP <= 800px */}
      {isDetailMobile && (
        <>
          <div className={styles.imageAndTitleAndDetailsContainer}>
            <HeroImage anime={anime}/>
            <div className={styles.titleAndDetailsContainer}>
              <AnimeRank anime={anime} />
              <AnimeTitle anime={anime}/>
              <ShowDetailsButton/>
            </div>
          </div>
          <div className={styles.synopsisContainer}>
            <h2>Overview</h2>
            <Synopsis anime={anime}/>
          </div>   
        </>
      )}



      {/* BREAKPOINT for DESKTOP >= 801px */}
      {!isDetailMobile && (
        <>
          <div className={styles.leftContainer}>
            <div className={styles.imageAndStatsContainer}>
              <HeroImage anime={anime}/>
              <Stats anime={anime}/>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <HeroInfo anime={anime}/>
            <Characters anime={anime} id={params.id}/>
            <RelatedAnime 
              anime={anime}
              mainIdsType={mainIdsType}
              spinOffIds={spinOffIds}
              setMainIdsType={setMainIdsType}
              setSpinOffIds={setSpinOffIds}
            />
            <StudioProducers 
              anime={anime}
              count={count}
              countUpdated={countUpdated}
            />
            <News id={params.id}/>
            <SimilarAnime id={params.id}/> 
          </div>
        </>
      )}
    </div>
  )
}

export default AnimeDetail