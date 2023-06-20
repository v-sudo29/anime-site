import React, { useEffect, useState, useRef } from 'react'
import SearchAndGenres from './SearchAndGenres'
import SearchResults from './SearchResults'
import LoaderAnimation from '../../components/LoaderAnimation'
import styles from '../../styles/anime-list/AnimeList.module.css'

function AnimeList() {
  const [animeData, setAnimeData] = useState(null)
  const [animeCards, setAnimeCards] = useState(null)
  const runOnce = useRef(false)

  // Fetch and set data
  async function fetchData(url) {
    try {
      const res = await fetch(url)
      const data = await res.json()

      setAnimeData(data.data)
    } catch (error) {console.error(error)}
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
    <div className={styles.container}>
      {animeData ?
      <div className={styles.content}>
        <div className={styles.heroImageContainer}></div>
        <SearchAndGenres
          fetchData={fetchData}
        />
        <SearchResults
          animeData={animeData}
          animeCards={animeCards}
          setAnimeCards={setAnimeCards}
          fetchData={fetchData}
        />
      </div> : <LoaderAnimation/>}
    </div>
  )
}

export default AnimeList