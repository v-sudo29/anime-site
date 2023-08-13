import React, { useEffect, useState, useRef } from 'react'
import SearchAndGenres from './SearchAndGenres'
import SearchResults from './SearchResults'
import LoaderAnimation from '../../components/LoaderAnimation'
import styles from '../../styles/anime-list/AnimeList.module.css'

function AnimeList() {
  const [animeData, setAnimeData] = useState(null)
  const [genresShown, setGenresShown]= useState(false)
  const [topFilter, setTopFilter] = useState('Most Popular')
  const [thereIsMore, setThereIsMore] = useState(true)
  const [resultsType, setResultsType] = useState('filter')
  const [pageCount, setPageCount] = useState(2)
  const inputValue = useRef(null)
  const genresContainerRef = useRef(null)

  // Reset pageCount
  function resetPageCount() {
    setPageCount(2)
  }

  // Fetch and set data
  async function fetchData(url) {
    try {
      const res = await fetch(url)
      const data = await res.json()

      setAnimeData(data.data)
      !data.pagination['has_next_page'] ? setThereIsMore(false) : setThereIsMore(true)
    } catch (error) {console.error(error)}
  }

  // Set default data
  useEffect(() => {
    if (!animeData) fetchData('https://api.jikan.moe/v4/top/anime?filter=bypopularity')
    document.title = 'Anime Site: Anime List'
  }, [animeData])

  return (
    <div className={styles.container}>
      {animeData ?
      <div className={styles.content}>
        <div className={styles.heroImageContainer}></div>
        <SearchAndGenres
          genresShown={genresShown}
          setGenresShown={setGenresShown}
          inputValue={inputValue}
          resetPageCount={resetPageCount}
          setResultsType={setResultsType}
          fetchData={fetchData}
          genresContainerRef={genresContainerRef}
        />
        <SearchResults
          animeData={animeData}
          setAnimeData={setAnimeData}
          fetchData={fetchData}
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