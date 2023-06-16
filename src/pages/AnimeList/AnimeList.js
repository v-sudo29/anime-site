import React, { useEffect, useState, useRef } from 'react'
import SearchAndGenres from './SearchAndGenres'
import SearchResultsAL from './SearchResultsAL'
import LoaderAnimation from '../../components/LoaderAnimation'

function AnimeList() {
  const [animeData, setAnimeData] = useState(null)
  const [animeCards, setAnimeCards] = useState(null)
  const runOnce = useRef(false)

  function animateCarrot() {
    const svgElement = document.querySelector('.genres-carrot-container svg')

    if (!svgElement.classList.contains('carrot-active')) {
      svgElement.classList.add('carrot-active')
    } else {
      svgElement.classList.remove('carrot-active')
    }
  }

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
  }, [])

  return (
    <div className='animeList-page-container'>
      {animeData ?
      <div className='animeList-page-content'>
        <div className='animeList-hero-image-container'></div>
        <SearchAndGenres
          animateCarrot={animateCarrot}
          fetchData={fetchData}
        />
        <SearchResultsAL
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