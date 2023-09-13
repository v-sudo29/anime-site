import React from 'react'
import { useNavigate } from 'react-router-dom'
import AnimeListCard from '../../components/AnimeListCard'
import styles from '../../styles/home/popular/MostPopular.module.css'

export default function MostPopular({popularData}) {
  const navigate = useNavigate()
  let popularCards = null

  const handleClick = () => navigate('/anime-list')

  if (popularData) popularCards = popularData.data.map((anime, index) =>
    <AnimeListCard 
      key={`${anime['mal_id']}-popular`}
      anime={anime}
      index={index}
      cardType='popular'
      id={anime['mal_id']}
    />
  )

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