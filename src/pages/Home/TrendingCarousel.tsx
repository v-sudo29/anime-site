import React, { useState, useEffect, useRef } from 'react'
import CarouselButtons from './CarouselButtons'
import TrendingCard from './TrendingCard'
import styles from '../../styles/home/trending/TrendingCarousel.module.css'
import Arrows from './Arrows'
import { useMobile } from '../../context/mobileContext'

export default function TrendingCarousel({ trendingData }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const timeOutRef = useRef(null)
  const runOnce = useRef(false)
  const { isMobile } = useMobile()
  const delay = 10000;

  // Reset carousel timeout
  const resetTimeout = () => {
    if (timeOutRef.current) clearTimeout(timeOutRef.current)
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
      <div className={styles.header}>
        <h2>Top Trending Anime</h2>
        {trendingData && isMobile && (
          <CarouselButtons 
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        )}
      </div>

        <div className={styles.slideshow}>
          {trendingData ?
          <>
            <div 
              className={styles.slideshowSlider}
              style={{ transform: `translate3d(${-currentIndex * 100}%, 0, 0)` }}
            >
              {trendingData.map((anime, index) => {
                if (isMobile && index < 4) return <TrendingCard key={anime['mal_id'] + '-trending'} anime={anime}/>
                if (!isMobile && index < 6) return <TrendingCard key={anime['mal_id'] + '-trending'} anime={anime}/>
                return null
              })}
            </div>
            {!isMobile && (
              <CarouselButtons 
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
              />
            )}
            {!isMobile && (
              <Arrows 
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
              />
            )}
          </> :
            <h1>...Loading Trending Anime</h1> 
          }
        </div>
      </section>
  )
}