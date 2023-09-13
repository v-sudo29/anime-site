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
  fetchNewData,
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
  genresContainerRef
  }) {
  const runOnce = useRef(false)
  let animeCards = null

  // Fetch and add new data to current data
  const fetchAndAdd = async (url) => {
    try {
      const res = await fetch(url)
      const data = await res.json()

      setAnimeData(prevData => [...prevData, ...data.data])
      !data.pagination['has_next_page'] ? setThereIsMore(false) : setThereIsMore(true)
      setPageCount(prevCount => prevCount + 1)
    } catch (error) {console.error(error)}
  }

  // Handles loading more anime for infinite scroll - genres search
  const loadMoreGenresAnime = () => {
    const searchParameter = inputValue.current.value ? inputValue.current.value : ''

    // Get selected genres into an array
    const genreContainerExists = genresContainerRef.current ? true : false
    const buttonElementsArr = genreContainerExists ? [...genresContainerRef.current.children]
      : []
    const selectedGenres = []

    // Push active genres to selectedGenres state
    if (genreContainerExists) {
      buttonElementsArr.forEach(button => {
        const list = button.classList
        if (list.value.includes('active')) selectedGenres.push(button.innerText)
      })
    }

    // Convert genres to mal_id's
    const idsArr = genresToIds(selectedGenres)
    const stringifiedGenres = selectedGenres.length > 0 ? idsArr.join(',') : ''
    const searchUrl = `https://api.jikan.moe/v4/anime?type=tv&genres=${stringifiedGenres}&q=${searchParameter}&page=${pageCount}`
    
    fetchAndAdd(searchUrl)
  }

  // Fetch and set additional data for infinite scroll
  const loadMoreFilterAnime = async () => {
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
      if (topFilter === 'Most Popular') fetchNewData(url.popular)
      if (topFilter === 'Top Trending') fetchNewData(url.trending)
      if (topFilter === 'Top Upcoming') fetchNewData(url.upcoming)
      if (topFilter === 'Top TV Series') fetchNewData(url.tv)
      if (topFilter === 'Top Movies') fetchNewData(url.movie)
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
            next={resultsType === 'filter' ? loadMoreFilterAnime : loadMoreGenresAnime}
            hasMore={thereIsMore}
          >
            {animeCards ? (animeCards.length === 0 ? <NoResults/> : animeCards) : '...Loading'}
          </InfiniteScroll>
        </div>
      </div>
  )
}
