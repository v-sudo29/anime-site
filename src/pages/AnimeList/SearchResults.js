import React, { useState, useEffect, useRef } from 'react'
import CustomSelect from '../../components/CustomSelect'
import AnimeListCard from '../../components/AnimeListCard'

export default function SearchResults({
    fetchData, 
    animeCards, 
    animeData, 
    setAnimeCards
  }) {
  const [topFilter, setTopFilter] = useState('Most Popular')
  const pageCount = useRef(2)
  const runOnce = useRef(false)
  const popularUrl = 'https://api.jikan.moe/v4/top/anime?filter=bypopularity'
  const trendingUrl = 'https://api.jikan.moe/v4/top/anime?filter=airing'
  // API endpoint broken //
  const upcomingUrl = 'https://api.jikan.moe/v4/top/anime?filter=bypopularity'
  const tvUrl = 'https://api.jikan.moe/v4/top/anime?order_by=score&type=tv'
  const movieUrl = 'https://api.jikan.moe/v4/top/anime?filter=bypopularity&type=movie'
  

  // TODO: Fetch and set additional data
  async function loadMoreAnime() {
    // code here
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animeData])

  // Fetch and set new data when topFilter changes
  useEffect(() => {
    if (!runOnce.current) {
      runOnce.current = true
    } else {
      if (topFilter === 'Most Popular') fetchData(popularUrl)
      else if (topFilter === 'Top Trending') fetchData(trendingUrl)
      else if (topFilter === 'Top Upcoming') fetchData(upcomingUrl)
      else if (topFilter === 'Top TV Series') fetchData(tvUrl)
      else if (topFilter === 'Top Movies') fetchData(movieUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topFilter])

  return (
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
  )
}
