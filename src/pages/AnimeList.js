import React, { useState, useEffect, useRef } from 'react'
import AnimeListCard from '../components/AnimeListCard'
import SearchIcon from '../icons/SearchIcon'
import CarrotDown from '../icons/CarrotDown'
import CustomSelect from '../components/CustomSelect'

function AnimeList() {
  const [animeData, setAnimeData] = useState(null)
  const [animeCards, setAnimeCards] = useState(null)
  const [topFilter, setTopFilter] = useState(null)
  const [genresShown, setGenresShown]= useState(false)
  const pageCount = useRef(2)
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

  const popularUrl = 'https://api.jikan.moe/v4/top/anime?filter=bypopularity'
  const trendingUrl = 'https://api.jikan.moe/v4/top/anime?filter=airing'
  // API endpoint broken //
  const upcomingUrl = 'https://api.jikan.moe/v4/top/anime?filter=bypopularity'
  const tvUrl = 'https://api.jikan.moe/v4/top/anime?order_by=score&type=tv'
  const movieUrl = 'https://api.jikan.moe/v4/top/anime?filter=bypopularity&type=movie'

  function animateCarrot() {
    const svgElement = document.querySelector('.genres-carrot-container svg')
    if (!svgElement.classList.contains('carrot-active')) {
      svgElement.classList.add('carrot-active')
    } else {
      svgElement.classList.remove('carrot-active')
    }
  }

  function toggleGenres(e) {
    e.stopPropagation()

    setGenresShown(!genresShown)
    animateCarrot()
  }

  // Fetch and set additional data
  async function loadMoreAnime() {
    // TODO: wait for UX design feedback
  }

  // Fetch and set data
  async function fetchData(url) {
    try {
      const res = await fetch(url)
      const data = await res.json()

      setAnimeData(data.data)
    } catch (error) {console.error(error)}
  }

  // Update cards when fetch data changes
  useEffect(() => {
    if (animeData) {
      setAnimeCards(animeData.map((anime, index) => {
        return (
          <AnimeListCard 
            key={`${anime['mal_id']}-most-popular`}
            anime={anime}
            index={index}
            cardType='popular'
          />
        )
      }))
    }
  }, [animeData])


  // Fetch and set new data when topFilter changes
  useEffect(() => {
    if (topFilter === 'Most Popular') {
      fetchData(popularUrl)
    } else if (topFilter === 'Top Trending') {
      fetchData(trendingUrl)
    } else if (topFilter === 'Top Upcoming') {
      fetchData(upcomingUrl)
    } else if (topFilter === 'Top TV Series') {
      fetchData(tvUrl)
    }  else if (topFilter === 'Top Movies') {
      fetchData(movieUrl)
    }
  }, [topFilter])

  return (
    <div className='animeList-page-container'>
      <div className='animeList-hero-image-container'></div>
      <div className='animeList-search-and-genres-container'>
        <div className='search-bar-and-button-container'>
          <div className='search-bar-container'>
            <div className='animeList-search-icon-container'>
              <SearchIcon className='animeList-search-icon' />
            </div>
            <input className='search-bar' type="text" placeholder='Search for anime'/>
          </div>
          <button onClick={(e) => toggleGenres(e)} className='genres-btn' type="button">
            Genres
            <div className='genres-carrot-container'>
              <CarrotDown />
            </div>
          </button>
        </div>
        {genresShown ?
        <div className='genre-tags-container'>
          {genresMasterList.current.map(genre => {
            return (
              <button key={genre['mal_id']} className='genre-tag' type="button">{genre.name}</button>
            )
          })}
        </div>
        : null}
      </div>
      <div className='animeList-container'>
        <div className='animeList-title-and-filter'>
          <h2 className='animeList-title'>Anime List</h2>
          <CustomSelect setTopFilter={setTopFilter}/>
        </div>
        <div className='animeList-cards-container'> 
          {animeCards ? animeCards : '...Loading'}
        </div>
    
        {pageCount.current !== 5 ? 
        <button 
          onClick={loadMoreAnime} 
          className='see-more-btn' 
          type="button"> 
        See More
        </button>
        : null
        }

      </div>
    </div>
  )
}

export default AnimeList