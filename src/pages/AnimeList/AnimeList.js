import React, { useState } from 'react'
import SearchAndGenres from './SearchAndGenres'
import SearchResultsAL from './SearchResultsAL'

function AnimeList() {
  const [animeData, setAnimeData] = useState(null)
  const [animeCards, setAnimeCards] = useState(null)

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
      console.log(data.data)
    } catch (error) {console.error(error)}
  }

  return (
    <div className='animeList-page-container'>
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
    </div>
  )
}

export default AnimeList