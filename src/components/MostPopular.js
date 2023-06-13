import React, { useState, useEffect, useRef } from 'react'
import AnimeListCard from './AnimeListCard'

export default function MostPopular({popularData, setPopularData}) {
  const [popularCards, setPopularCards] = useState(null)
  const runOnce = useRef(false)
  const pageCount = useRef(1)

  // Fetch additional data
  function loadMoreAnime() {
    fetch(`https://api.jikan.moe/v4/top/anime?filter=bypopularity&page=${pageCount.current}`)
        .then(res => res.json())
        .then(data => setPopularData(prevData => [...prevData, ...data.data]))
  }

  // Set popularCards, add new popularCards
  useEffect(() => {
    if (popularData && !runOnce.current) {
      setPopularCards(popularData.map((anime, index) => {
        return (
          <AnimeListCard 
            key={`${anime['mal_id']}-popular`}
            anime={anime}
            index={index}
            cardType='popular'
          />
        )
      }))
      runOnce.current = true
      pageCount.current = 2
    } else if (popularData && runOnce.current) {
      
      // Set new popular cards
        setPopularCards(popularData.map((anime, index) => {
          return (
            <AnimeListCard 
            key={`${anime['mal_id']}-popular`}
            anime={anime}
            index={index}
            cardType='popular'
            />
          )
        }))

        if (pageCount.current !== 5) {
          pageCount.current += 1
        }
    }
  }, [popularData])

  return (
    <div className='popular-container'>
      <h2>Top 100 Most Popular Anime</h2>
      <div className='popular-cards-container'>
        {popularCards}
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