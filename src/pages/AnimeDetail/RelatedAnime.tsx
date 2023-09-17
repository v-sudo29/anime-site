import React, { useEffect } from 'react'
import RelatedCard from './RelatedCard'
import useFetchMainSeries from '../../hooks/useFetchMainSeries'
import useFetchSpinoff from '../../hooks/useFetchSpinoff'
import styles from '../../styles/anime-detail/RelatedAnime.module.css'
import { AnimeDetailData } from '../../types/fetchDataTypes/fetchAnimeDetailTypes'
import { IMainIdsType } from '../../types/stateTypes/AnimeDetailTypes'

interface IRelatedAnime {
  anime: AnimeDetailData | null
  mainIdsType: IMainIdsType[]
  spinOffIds: number[]
  setMainIdsType: React.Dispatch<React.SetStateAction<IMainIdsType[]>>
  setSpinOffIds: React.Dispatch<React.SetStateAction<number[]>>
}

export default function RelatedAnime({
  anime, 
  mainIdsType, 
  spinOffIds, 
  setMainIdsType,
  setSpinOffIds
  } : IRelatedAnime) {
  const { mainData } = useFetchMainSeries(mainIdsType)
  const { spinOffData } = useFetchSpinoff(spinOffIds)

  let mainSeriesCards: JSX.Element[] = []
  let spinOffCards: JSX.Element[] = []

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

  if (mainData && mainData.length > 0) mainSeriesCards = mainData.map(anime => 
    <RelatedCard
      key={anime.name}
      styles={styles}
      anime={anime}
    />
  )

  if (spinOffData && spinOffData.length > 0) spinOffCards = spinOffData.map(anime => 
    <RelatedCard
      key={anime.name}
      styles={styles}
      anime={anime}
    />
  )

  return (
    <>
      <div className={`${styles.relatedAnimeContainer} relatedAnime`}>
        <h2 className={styles.sectionTitle}>Related Anime</h2>
        <div className={styles.relatedContent}>

        {/* Main series */}
        {mainSeriesCards && mainSeriesCards.length > 0 ? 
          <div className={styles.mainSeries}>
            <h3>Main Series</h3>
            <div className={styles.mainCardsContainer}>
              {mainSeriesCards}
            </div>
          </div> 
        : null}

        {/* Spin-Offs */}
        {spinOffCards && spinOffCards.length > 0 ? 
          <div className={styles.spinOffs}>
          <h3>Spin-Offs</h3>
          <div className={styles.spinoffCardsContainer}>
            {spinOffCards}
          </div>
          </div> 
        : null}

        {(mainSeriesCards.length === 0 && spinOffCards.length === 0) && 'No related anime.'}

        </div>
      </div>
    </>
  )
}
