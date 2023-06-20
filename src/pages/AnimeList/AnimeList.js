import React, { useEffect, useState, useRef } from 'react'
import SearchAndGenres from './SearchAndGenres'
import SearchResults from './SearchResults'
import LoaderAnimation from '../../components/LoaderAnimation'
import styles from '../../styles/anime-list/AnimeList.module.css'

function AnimeList() {
  const [animeData, setAnimeData] = useState(null)
  const [animeCards, setAnimeCards] = useState(null)
  const [genresShown, setGenresShown]= useState(false)
  const [genresSelected, setGenresSelected] = useState([])
  const [topFilter, setTopFilter] = useState('Most Popular')
  const [thereIsMore, setThereIsMore] = useState(true)
  const inputValue = useRef(null)
  const runOnce = useRef(false)
  const scrollRef = useRef(null)
  const genresMasterList = useRef([
    {name: 'Action', mal_id: 1},
    {name: 'Adventure', mal_id: 2},
    {name: 'Boys Love', mal_id: 28},
    {name: 'Comedy', mal_id: 4},
    {name: 'Drama', mal_id: 8},
    {name: 'Fantasy', mal_id: 10},
    {name: 'Girls Love', mal_id: 26},
    {name: 'Horror', mal_id: 14},
    {name: 'Mystery', mal_id: 7},
    {name: 'Romance', mal_id: 22},
    {name: 'Sci-Fi', mal_id: 24},
    {name: 'Slice of Life', mal_id: 36},
    {name: 'Sports', mal_id: 30},
    {name: 'Supernatural', mal_id: 37},
    {name: 'Suspense', mal_id: 41},
  ])

  // Fetch and set data
  async function fetchData(url) {
    try {
      const res = await fetch(url)
      const data = await res.json()

      setAnimeData(data.data)
      if (!data.pagination['has_next_page']) setThereIsMore(false)
      else setThereIsMore(true)
    } catch (error) {console.error(error)}
  }

  // Handle genres search
  function handleGenresSearch() {
    const searchParameter = inputValue.current.value

    // Convert genres to mal_id's
    const idsArr = genresSelected.map(genre => {
      let malId = null
      genresMasterList.current.forEach(obj => obj.name === genre ? malId = obj['mal_id'] : null)
      return malId
    })

    const stringifiedGenres = genresSelected.length > 0 ? idsArr.join(',') : ''
    const searchUrl = `https://api.jikan.moe/v4/anime?type=tv&genres=${stringifiedGenres}&q=${searchParameter}`

    fetchData(searchUrl)
  }

  // Set default data
  useEffect(() => {
    if (!animeData && !runOnce.current) {
      fetchData('https://api.jikan.moe/v4/top/anime?filter=bypopularity')
      runOnce.current = true
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={scrollRef} className={styles.container}>
      {animeData ?
      <div className={styles.content}>
        <div className={styles.heroImageContainer}></div>
        <SearchAndGenres
          genresMasterList={genresMasterList}
          genresShown={genresShown}
          setGenresShown={setGenresShown}
          setGenresSelected={setGenresSelected}
          inputValue={inputValue}
          handleGenresSearch={handleGenresSearch}
        />
        <SearchResults
          animeData={animeData}
          animeCards={animeCards}
          setAnimeData={setAnimeData}
          setAnimeCards={setAnimeCards}
          fetchData={fetchData}
          handleGenresSearch={handleGenresSearch}
          topFilter={topFilter}
          setTopFilter={setTopFilter}
          thereIsMore={thereIsMore}
          setThereIsMore={setThereIsMore}
        />
      </div> : <LoaderAnimation/>}
    </div>
  )
}

export default AnimeList