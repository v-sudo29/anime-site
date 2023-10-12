import React from 'react'
import AnimeListCard from '../../components/AnimeListCard'
import styles from '../../styles/home/popular/MostPopular.module.css'
import { useNavigate } from 'react-router-dom'
import { useMobile } from '../../context/mobileContext'
import { PopularResponse } from '../../types/fetchDataTypes/fetchPopularTypes'

const MostPopular = ({ popularData } : { popularData: PopularResponse}) => {
  const navigate = useNavigate()
  const { isMobile } = useMobile()
  let popularCards = null
  
  // On click, navigate to anime list page
  const handleClick = (): void => navigate('anime')

  // Once popular data is available, set cards
  if (popularData) popularCards = popularData.data.map((anime, index) => {
    if (isMobile && index < 9) {
      return (
        <AnimeListCard 
          key={`${anime['mal_id']}-popular`}
          anime={anime}
          index={index}
          id={anime['mal_id']}
        />
      )
    } 
    if (!isMobile) {
      return (
        <AnimeListCard 
          key={`${anime['mal_id']}-popular`}
          anime={anime}
          index={index}
          id={anime['mal_id']}
        />
      )
    } return null
  })

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Most Popular Anime</h2>
      <div className={styles.cardsContainer}>
        {popularCards}
      </div>
      <button onClick={handleClick} className={styles.seeMoreBtn}> 
        See Full List
      </button>
    </div>
  )
}

export default MostPopular