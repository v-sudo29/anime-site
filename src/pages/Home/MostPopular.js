import React, { useState, useEffect, useRef } from 'react'
import AnimeListCard from '../../components/AnimeListCard'
import styles from '../../styles/home/popular/MostPopular.module.css'

export default function MostPopular({popularData}) {
  const [popularCards, setPopularCards] = useState(null)
  const runOnce = useRef(false)
  const pageCount = useRef(1)

  function handleClick() {
    window.location.href='/anime-list'
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
            id={anime['mal_id']}
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
            />
          )
        }))

        if (pageCount.current !== 5) {
          pageCount.current += 1
        }
    }
  }, [popularData])

  return (
    <div className={styles.container}>
      <h2>Top 100 Most Popular Anime</h2>
      <div className={styles.cardsContainer}>
        {popularCards}
      </div>
      {pageCount.current !== 5 ? 
      <button 
        onClick={handleClick}
        className='see-more-btn' 
      > 
      See Anime List
      </button>
      : null
      }
    </div>
  )
}