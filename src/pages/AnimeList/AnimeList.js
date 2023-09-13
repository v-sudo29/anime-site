import React, { useEffect, useState, useRef } from 'react'
import SearchAndGenres from './SearchAndGenres'
import SearchResults from './SearchResults'
import LoaderAnimation from '../../components/LoaderAnimation'
import styles from '../../styles/anime-list/AnimeList.module.css'
import { useDefaultData } from '../../context/defaultDataContext'

function AnimeList() {
  const [animeData, setAnimeData] = useState(null)
  const [genresShown, setGenresShown]= useState(false)
  const [topFilter, setTopFilter] = useState('Most Popular')
  const [thereIsMore, setThereIsMore] = useState(true)
  const [resultsType, setResultsType] = useState('filter')
  const [pageCount, setPageCount] = useState(2)
  const { popularData } = useDefaultData()

  const inputValue = useRef(null)
  const genresContainerRef = useRef(null)

  // Reset pageCount
  const resetPageCount = () => setPageCount(2)

  // Fetch and set default popular anime data
  const fetchDefaultPopular = async () => {
    setAnimeData(popularData.data)
    popularData.pagination['has_next_page'] ? setThereIsMore(true) : setThereIsMore(false)
  }

  // Fetch and set new anime data
  const fetchNewData = async (url) => {
    try {
      const res = await fetch(url)
      const data = await res.json()

      setAnimeData(data.data)
      !data.pagination['has_next_page'] ? setThereIsMore(false) : setThereIsMore(true)
    } catch (error) {console.error(error)}
  }

  // Set default data on load
  useEffect(() => {
    if (!animeData && popularData) fetchDefaultPopular()
    document.title = 'Anime Site: Anime List'
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popularData, animeData])

  return (
    <div className={styles.container}>
      {animeData ?
      <div className={styles.content}>
        {/* <div className={styles.heroImageContainer}></div> */}
        <SearchAndGenres
          genresShown={genresShown}
          setGenresShown={setGenresShown}
          inputValue={inputValue}
          resetPageCount={resetPageCount}
          setResultsType={setResultsType}
          fetchDefaultPopular={fetchDefaultPopular}
          genresContainerRef={genresContainerRef}
          fetchNewData={fetchNewData}
        />
        <SearchResults
          animeData={animeData}
          setAnimeData={setAnimeData}
          fetchNewData={fetchNewData}
          topFilter={topFilter}
          setTopFilter={setTopFilter}
          thereIsMore={thereIsMore}
          setThereIsMore={setThereIsMore}
          pageCount={pageCount}
          setPageCount={setPageCount}
          resetPageCount={resetPageCount}
          resultsType={resultsType}
          setResultsType={setResultsType}
          inputValue={inputValue}
          genresContainerRef={genresContainerRef}
        />
      </div> : <LoaderAnimation/>}
    </div>
  )
}

export default AnimeList