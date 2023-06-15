import React, { useState, useEffect, useRef } from 'react'
import AnimeListCard from '../components/AnimeListCard'
import SearchIcon from '../icons/SearchIcon'
import CarrotDown from '../icons/CarrotDown'
import CustomSelect from '../components/CustomSelect'

function AnimeList() {
  const [animeData, setAnimeData] = useState(null)
  const [animeCards, setAnimeCards] = useState(null)
  const [topFilter, setTopFilter] = useState(null)
  const pageCount = useRef(2)
  const popularUrl = 'https://api.jikan.moe/v4/top/anime?filter=bypopularity'
  const trendingUrl = 'https://api.jikan.moe/v4/top/anime?filter=airing'
  // API endpoint broken //
  const upcomingUrl = 'https://api.jikan.moe/v4/top/anime?filter=bypopularity'
  const tvUrl = 'https://api.jikan.moe/v4/top/anime?order_by=score&type=tv'
  const movieUrl = 'https://api.jikan.moe/v4/top/anime?filter=bypopularity&type=movie'

  // Fetch and set additional data
  async function loadMoreAnime() {
    // let filterName = null
    // let parameter = null

    // if (topFilter === 'Most Popular') filterName = 'bypopularity'
    // else if (topFilter === 'Top Trending') filterName = 'airing'
    // // API endpoint broken
    // else if (topFilter === 'Top Upcoming') filterName = 'bypopularity'
    // else if (topFilter === 'Top TV Series') filterName = 'tv'
    // else if (topFilter === 'Top Movies') filterName = 'movie'

    // if (topFilter === ('Most Popular' || 'Top Trending' || 'Top Upcoming')) parameter = 'filter'
    // else if (topFilter === ('Top TV Series' || 'Top Movies')) parameter = 'type'

    // try {
    //   const res = await fetch(`https://api.jikan.moe/v4/top/anime?${parameter}=${filterName}&page=${pageCount.current}`)
    //   const data = await res.json()

    //   setAnimeData(prevData => [...prevData, ...data.data])
    //   pageCount.current += 1
    // }
    // catch (error) {console.error(error)}
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
        <div className='search-bar-container'>
          <div className='animeList-search-icon-container'>
            <SearchIcon className='animeList-search-icon' />
          </div>
          <input className='search-bar' type="text" placeholder='Search for anime'/>
        </div>
        <button className='genres-btn' type="button">
          Genres
          <CarrotDown />
        </button>
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