import React, { useEffect, useRef } from 'react'
import CustomSelect from '../../components/CustomSelect'
import AnimeListCard from '../../components/AnimeListCard'
import NoResults from '../../components/NoResults';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from '../../styles/anime-list/SearchResults.module.css'
import { url } from './urls'
import genresToIds from '../../helpers/genresToIds';

export default function SearchResults({
  animeData, 
  setAnimeData,
  fetchData,
  topFilter,
  setTopFilter,
  thereIsMore,
  setThereIsMore,
  pageCount,
  setPageCount,
  resetPageCount,
  resultsType,
  setResultsType,
  inputValue,
  genresSelected,
  }) {
  const runOnce = useRef(false)
  let animeCards = null

  // Fetch and add new data to current data
  async function fetchAndAdd(url) {
    try {
      const res = await fetch(url)
      const data = await res.json()

      setAnimeData(prevData => [...prevData, ...data.data])
      !data.pagination['has_next_page'] ? setThereIsMore(false) : setThereIsMore(true)
      setPageCount(prevCount => prevCount + 1)
    } catch (error) {console.error(error)}
  }

  // Handles genres search infinite scroll
  function loadMoreGenresAnime() {
    const searchParameter = inputValue.current.value ? inputValue.current.value : ''

    // Convert genres to mal_id's
    const idsArr = genresToIds(genresSelected)
    const stringifiedGenres = genresSelected.length > 0 ? idsArr.join(',') : ''
    const searchUrl = `https://api.jikan.moe/v4/anime?type=tv&genres=${stringifiedGenres}&q=${searchParameter}&page=${pageCount}`
    
    fetchAndAdd(searchUrl)
  }

  // Fetch and set additional data for infinite scroll
  async function loadMoreAnime() {
    if (topFilter === 'Most Popular') fetchAndAdd(url.popularInfinite + pageCount)
    if (topFilter === 'Top Trending') fetchAndAdd(url.trendingInfinite + pageCount)
    if (topFilter === 'Top Upcoming') fetchAndAdd(url.upcomingInfinite + pageCount)
    if (topFilter === 'Top TV Series') fetchAndAdd(url.tvInfinite + pageCount)
    if (topFilter === 'Top Movies') fetchAndAdd(url.movieInfinite + pageCount)
  }

  // Fetch and set new data when topFilter changes
  useEffect(() => {
    if (!runOnce.current) runOnce.current = true
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

  if (animeData) animeCards = animeData.map((anime, index) => 
    <AnimeListCard 
      key={`${anime['mal_id']}-animeList-${index}`}
      anime={anime}
      index={index}
      id={anime['mal_id']}
    />
  )

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
