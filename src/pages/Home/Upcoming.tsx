import React from 'react'
import UpcomingCard from './UpcomingCard'
import { useMobile } from '../../context/mobileContext'
import styles from '../../styles/home/upcoming/Upcoming.module.css'
import { UpcomingDatum } from '../../types/fetchDataTypes/fetchUpcomingTypes'

export default function Upcoming({ upcomingData } : { upcomingData: UpcomingDatum[] | null}) {
  const { isMobile, isTablet } = useMobile()
  let upcomingCards = null

  if (upcomingData) upcomingCards = upcomingData.map((anime, index) => {
    if (!isMobile && !isTablet && index < 10) {
      return (
        <UpcomingCard
          key={anime['mal_id']}
          anime={anime}
        />
      )
    }
    if ((isMobile || isTablet) && index < 6) {
      return (
        <UpcomingCard
          key={anime['mal_id']}
          anime={anime}
        />
      )
    } 
    return null
  })

  return (
    <section className={styles.container}>
      <h2 className={styles.sectionTitle}>Upcoming Anime</h2>
      <div className={styles.cardsContainer}>
        {upcomingCards}
      </div>
    </section>
  )
}