import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoaderAnimation from '../../components/LoaderAnimation'
import styles from '../../styles/anime-detail/AnimeDetail.module.css'
import HeroContent from './HeroContent'
import NavButtons from './NavButtons'
import Stats from './Stats'
import Summary from './Summary'
import Characters from './Characters'
import RelatedAnime from './RelatedAnime'
import StudioProducers from './StudioProducers'
import News from './News'
import SimilarAnime from './SimilarAnime'
import useFetchAnime from '../../hooks/useFetchAnime'
import FetchError from '../../components/FetchError'

function AnimeDetail() {
  const params = useParams()
  const {anime, animeLoading, animeError} = useFetchAnime()
  const [mainIdsType, setMainIdsType] = useState([])
  const [spinOffIds, setSpinOffIds] = useState([])
  const [count, setCount] = useState(null)
  const [countUpdated, setCountUpdated] = useState(false)

  // Update count states
  useEffect(() => {
    if (mainIdsType && spinOffIds) {
      setCount(mainIdsType.length + spinOffIds.length)
      setCountUpdated(true)
    }
  }, [mainIdsType, spinOffIds])

  if (animeLoading) return <LoaderAnimation/>
  if (animeError) return <FetchError/>
  if (anime) return (
    <div className={`${styles.detailPage} overview`}>
      <div className={styles.backgroundImg}></div>
        <div className={styles.content}>
          <HeroContent anime={anime}/>
          <NavButtons />
          <Stats anime={anime}/>
          <Summary anime={anime}/>
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
    </div>
  )
}

export default AnimeDetail