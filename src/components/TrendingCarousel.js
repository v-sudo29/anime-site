import React, { useState, useEffect, useRef } from 'react'
import CarouselButtons from './CarouselButtons'
import TrendingCard from './TrendingCard'

export default function TrendingCarousel({trendingData}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const timeOutRef = useRef(null)
  const runOnce = useRef(false)
  const delay = 10000;

  function resetTimeout() {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current)
    }
  }

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
    <section className='trending-container'>
        <h2>Top Trending Anime</h2>
        <div className='slideshow'>
          {trendingData ?
          <>
            <div 
              className='slideshowSlider'
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