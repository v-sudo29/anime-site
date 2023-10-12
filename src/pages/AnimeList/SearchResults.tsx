import React, { useEffect, useRef } from 'react'
import CustomSelect from '../../components/CustomSelect'
import AnimeListCard from '../../components/AnimeListCard'
import NoResults from '../../components/NoResults';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from '../../styles/anime-list/SearchResults.module.css'
import { url } from './urls'
import genresToIds from '../../helpers/genresToIds';
import LoaderAnimation from '../../components/LoaderAnimation';
import { useMobile } from '../../context/mobileContext';
import { SearchDataTypes, SearchResponseTypes, SingleSearchedAnime } from '../../types/stateTypes/AnimeListTypes';

interface ISearchResults {
  animeData: SearchDataTypes | null
  setAnimeData: React.Dispatch<React.SetStateAction<SearchDataTypes | null>>
  fetchNewData: (url: string) => Promise<void>
  topFilter: string
  setTopFilter: React.Dispatch<React.SetStateAction<string>>
  thereIsMore: boolean
  setThereIsMore: React.Dispatch<React.SetStateAction<boolean>>
  pageCount: number
  setPageCount: React.Dispatch<React.SetStateAction<number>>
  resetPageCount: () => void
  resultsType: string
  setResultsType: React.Dispatch<React.SetStateAction<string>>
  inputValue: React.RefObject<HTMLInputElement>
}

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
  } : ISearchResults) {
  const { isMobile } = useMobile()
  const runOnce = useRef(false)
  let animeCards = null

  // Fetch and add new data to current data
  const fetchAndAdd = async (url: string) => {
    try {
      const res = await fetch(url)
      const data = await res.json() as SearchResponseTypes
      
        setAnimeData(prevData => {
          if (prevData) return [...prevData, ...data.data]
          else return prevData
        })
    
      !data.pagination['has_next_page'] ? setThereIsMore(false) : setThereIsMore(true)
      setPageCount(prevCount => prevCount + 1)
    } catch (error) {console.error(error)}
  }

  // Handles loading more anime for infinite scroll - genres search
  const loadMoreGenresAnime = () => {
    const searchParameter = inputValue.current?.value ? inputValue.current.value : ''

    // Get selected genres into an array
    const genresContainerExists = document.querySelector('.genreTagsContainer') as HTMLDivElement
    const buttonElementsArr = genresContainerExists ? [...genresContainerExists.children]
      : [] 
    const selectedGenres = [] as string[]

    // Push active genres to selectedGenres state
    if (genresContainerExists) {
      buttonElementsArr.forEach(button => {
        const buttonElement = button as HTMLButtonElement
        const list = button.classList
        if (list.value.includes('active')) selectedGenres.push(buttonElement.innerText)
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
          <h2 className={styles.sectionTitle}>Anime List</h2>
          {!isMobile && (
            <CustomSelect 
              setTopFilter={setTopFilter}
              resetPageCount={resetPageCount}
            />
          )}
        </div>
          {animeData ?
            <InfiniteScroll 
              dataLength={animeCards ? animeCards.length : 0}
              next={resultsType === 'filter' ? loadMoreFilterAnime : loadMoreGenresAnime}
              hasMore={thereIsMore}
              className={styles.infiniteScroll} loader={undefined}            >
              {animeCards ? (animeCards.length === 0 ? <NoResults/> : animeCards) : '...Loading'}
            </InfiniteScroll>
          : <LoaderAnimation/>} 
      </div>
  )
}
