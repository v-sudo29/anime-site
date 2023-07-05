import React, { useState, useEffect, useRef } from 'react'
import CarouselButtons from './CarouselButtons'
import TrendingCard from './TrendingCard'
import styles from '../../styles/home/trending/TrendingCarousel.module.css'

export default function TrendingCarousel({trendingData}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const timeOutRef = useRef(null)
  const runOnce = useRef(false)
  const delay = 10000;

  // Reset carousel timeout
  function resetTimeout() {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current)
    }
  }

  // Every 10 seconds, change slide
  useEffect(() => {
    if (trendingData && runOnce.current) {
      timeOutRef.current = setTimeout(() => {
        setCurrentIndex(prevIndex => {
          return Number(prevIndex) === Number(trendingData.length - 1) ? 0 : prevIndex + 1
      })
      }, delay)
    } runOnce.current = true

    return () => {resetTimeout()}
  }, [currentIndex, trendingData])

  return (
    <section className={styles.container}>
        <h2>Top Trending Anime</h2>
        <div className={styles.slideshow}>
          {trendingData ?
          <>
            <div 
              className={styles.slideshowSlider}
              style={{ transform: `translate3d(${-currentIndex * 100}%, 0, 0)` }}
            >
              {trendingData.map(anime => (
                <TrendingCard 
                  key={anime['mal_id'] + '-trending'}
                  anime={anime}
                />
              ))}
            </div>
            <CarouselButtons 
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
          </> :
            <h1>...Loading Trending Anime</h1> 
          }
        </div>
      </section>
  )
}