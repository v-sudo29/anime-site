import React, { useState, useEffect, useRef } from 'react'
import CarouselButtons from './CarouselButtons'
import TrendingCard from './TrendingCard'
import styles from '../../styles/home/trending/TrendingCarousel.module.css'
import Arrows from './Arrows'
import { useMobile } from '../../context/mobileContext'
import { TrendingDatum } from '../../types/fetchDataTypes/fetchTrendingTypes'

export default function TrendingCarousel({ trendingData } : { trendingData: TrendingDatum[] | null }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const timeOutRef = useRef<number | null>(null)
  const runOnce = useRef(false)
  const { isMobile, isTablet } = useMobile()
  const delay = 10000;
  let trendingCards: (JSX.Element | null)[] | null = null

  // Reset carousel timeout
  const resetTimeout = () => {
    if (timeOutRef.current) clearTimeout(timeOutRef.current)
  }

  // Every 10 seconds, change slide
  useEffect(() => {
    if (trendingData && trendingCards && trendingCards.length && runOnce.current) {
      timeOutRef.current = setTimeout(() => {
        setCurrentIndex(prevIndex => {
          return Number(prevIndex) === Number(trendingCards && trendingCards.length - 1) ? 0 : prevIndex + 1
      })
      }, delay)
    } runOnce.current = true

    return () => {resetTimeout()}
  }, [currentIndex, trendingCards])

  // If screen size changes, reset current index
  useEffect(() => {
    setCurrentIndex(0)
  }, [isMobile, isTablet])

  // Display trending cards UI
  if (trendingData) {
    trendingCards = trendingData.map((anime, index) => {
      if (isMobile && index < 4) return <TrendingCard key={anime['mal_id'] + '-trending'} anime={anime}/>
      if (!isMobile && index < 6) return <TrendingCard key={anime['mal_id'] + '-trending'} anime={anime}/>
      return null
    })
    trendingCards = trendingCards.filter(item => item !== null)
  }


  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>Top Trending Anime</h2>
      </div>
        <div className={styles.slideshow}>
          {trendingData ?
          <>
            <div 
              className={styles.slideshowSlider}
              style={{ transform: `translate3d(${-currentIndex * 100}%, 0, 0)` }}
            >
              {trendingCards}
            </div>
            {!isMobile && !isTablet && (
              <CarouselButtons 
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
              />
            )}
            {!isMobile && !isTablet && (
              <Arrows 
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
              />
            )}
          </> :
            <h1>...Loading Trending Anime</h1> 
          }
        </div>
        {trendingData && (isMobile || isTablet) && (
          <CarouselButtons 
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        )}
      </section>
  )
}