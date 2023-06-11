import React, { useState, useEffect } from 'react'
import TrendingCard from './TrendingCard'

export default function TrendingCarousel({trendingData}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [trendingCards, setTrendingCards] = useState(null)

  // Set trendingCards from trendingData
  useEffect(() => {
    if (trendingData) {
      setTrendingCards(trendingData.map(anime => {
        return (
          <TrendingCard 
            key={anime['mal_id']}
            id={anime['mal_id']}
            englishTitle={anime['title_english']}
            title={anime['title']}
            imageUrl={anime['images']['jpg']['large_image_url']}
            synopsis={anime['synopsis']}
          />
        )
      }))
    }
  }, [trendingData])

  return (
    <section className='trending-container'>
        <h2>Top Trending Anime</h2>
        <div className='trending-cards-container'>
          {trendingCards ? trendingCards[currentIndex] : <h1>...Loading</h1>}
        </div>
      </section>
  )
}