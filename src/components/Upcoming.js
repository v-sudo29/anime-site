import React, { useState, useEffect } from 'react'
import UpcomingCard from './UpcomingCard'

export default function Upcoming({upcomingData}) {
  const [upcomingCards, setUpcomingCards] = useState(null)

  // Set upcomingCards from upcomingData
  useEffect(() => {
    if (upcomingData) {
      setUpcomingCards(upcomingData.map(anime => {
        return (
          <UpcomingCard
            key={anime['mal_id']}
            id={anime['mal_id']}
            englishTitle={anime['title_english']}
            title={anime['title']}
            imageUrl={anime['images']['jpg']['large_image_url']}
          />
        )
      }))
    }
  }, [upcomingData])

  return (
    <section className='upcoming-container'>
        <h2>Upcoming Anime</h2>
        <div className='upcoming-cards-container'>
          {upcomingCards}
        </div>
      </section>
  )
}