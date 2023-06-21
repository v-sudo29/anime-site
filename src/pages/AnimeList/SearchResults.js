import React, { useEffect, useRef } from 'react'
import CustomSelect from '../../components/CustomSelect'
import AnimeListCard from '../../components/AnimeListCard'
import NoResults from '../../components/NoResults';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from '../../styles/anime-list/SearchResults.module.css'
import { url } from './urls'

export default function SearchResults({
    fetchData, 
    animeCards, 
    animeData, 
    setAnimeCards,
    topFilter,
    setTopFilter,
    thereIsMore,
    resetPageCount,
    pageCount,
    resultsType,
    setResultsType,
    fetchAndAdd,
    loadMoreGenresAnime
  }) {

  const runOnce = useRef(false)

  // Fetch and set additional data 
  async function loadMoreAnime() {
    if (topFilter === 'Most Popular') fetchAndAdd(url.popularInfinite + pageCount)
    if (topFilter === 'Top Trending') fetchAndAdd(url.trendingInfinite + pageCount)
    if (topFilter === 'Top Upcoming') fetchAndAdd(url.upcomingInfinite + pageCount)
    if (topFilter === 'Top TV Series') fetchAndAdd(url.tvInfinite + pageCount)
    if (topFilter === 'Top Movies') fetchAndAdd(url.movieInfinite + pageCount)
  }

  // Update cards when fetch data changes
  useEffect(() => {
    if (animeData) {
      setAnimeCards(animeData.map((anime, index) => {
        return (
          <AnimeListCard 
            key={`${anime['mal_id']}-animeList`}
            anime={anime}
            index={index}
          />
        )
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animeData])

  // Fetch and set new data when topFilter changes
  useEffect(() => {
    if (!runOnce.current) {
      runOnce.current = true
    } 
    else {
      setResultsType('filter')
      if (topFilter === 'Most Popular') fetchData(url.popular)
      else if (topFilter === 'Top Trending') fetchData(url.trending)
      else if (topFilter === 'Top Upcoming') fetchData(url.upcoming)
      else if (topFilter === 'Top TV Series') fetchData(url.tv)
      else if (topFilter === 'Top Movies') fetchData(url.movie)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topFilter])

  return (
      <div className={styles.container}>
        <div className={styles.titleAndFilter}>
          <h2 className='animeList-title'>Anime List</h2>
          <CustomSelect 
            setTopFilter={setTopFilter}
            resetPageCount={resetPageCount}
          />
        </div>
        <div className={styles.cardsContainer}> 
          <InfiniteScroll 
            dataLength={animeCards ? animeCards.length : null}
            next={resultsType === 'filter' ? loadMoreAnime : loadMoreGenresAnime}
            hasMore={thereIsMore}
          >
            {animeCards ? (animeCards.length === 0 ? <NoResults/> : animeCards) : '...Loading'}
          </InfiniteScroll>
        </div>
      </div>
  )
}
