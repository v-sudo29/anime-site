import React, { useState, useEffect } from 'react'
import UpcomingCard from './UpcomingCard'
import styles from '../../styles/home/upcoming/Upcoming.module.css'

export default function Upcoming({upcomingData}) {
  const [upcomingCards, setUpcomingCards] = useState(null)

  // Set upcomingCards from upcomingData
  useEffect(() => {
    if (upcomingData) {
      setUpcomingCards(upcomingData.map((anime, index) => {
        if (index < 8) {
          return (
            <UpcomingCard
              key={anime['mal_id']}
              id={anime['mal_id']}
              englishTitle={anime['title_english']}
              title={anime['title']}
              imageUrl={anime['images']['jpg']['large_image_url']}
            />
          )
        } return null
      }))
    }
  }, [upcomingData])

  return (
    <section className={styles.container}>
      <h2>Upcoming Anime</h2>
      <div className={styles.cardsContainer}>
        {upcomingCards}
      </div>
    </section>
  )
}