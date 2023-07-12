import React, { useState, useEffect } from 'react'
import AnimeListCard from '../../components/AnimeListCard'
import styles from '../../styles/home/popular/MostPopular.module.css'

export default function MostPopular({popularData}) {
  const [popularCards, setPopularCards] = useState(null)
  
  const handleClick = () => window.location.href='/anime-list'

  useEffect(() => {
    if (popularData) setPopularCards(popularData.map((anime, index) => {
      return (
        <AnimeListCard 
          key={`${anime['mal_id']}-popular`}
          anime={anime}
          index={index}
          cardType='popular'
          id={anime['mal_id']}
        />
      )
    }))
  }, [popularData])

  return (
    <div className={styles.container}>
      <h2>Top 100 Most Popular Anime</h2>
      <div className={styles.cardsContainer}>
        {popularCards}
      </div>
      <button onClick={handleClick} className={styles.seeMoreBtn}> 
        See Anime List
      </button>
    </div>
  )
}