import React from 'react'
import UpcomingCard from './UpcomingCard'
import styles from '../../styles/home/upcoming/Upcoming.module.css'

export default function Upcoming({upcomingData}) {
  let upcomingCards = null

  if (upcomingData) upcomingCards = upcomingData.map((anime, index) => 
    index < 10 && 
      <UpcomingCard
        key={anime['mal_id']}
        anime={anime}
      />
  )

  return (
    <section className={styles.container}>
      <h2>Upcoming Anime</h2>
      <div className={styles.cardsContainer}>
        {upcomingCards}
      </div>
    </section>
  )
}