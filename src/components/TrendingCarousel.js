import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import filterTitle from '../helpers/filterTitle'
import limitCharacters from '../helpers/limitCharacters'
import arrowIcon from '../assets/arrow-icon.png'
import CarouselButtons from './CarouselButtons'

export default function TrendingCarousel({trendingData}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    console.log(currentIndex)
  }, [currentIndex])

  return (
    <section className='trending-container'>
        <h2>Top Trending Anime</h2>
        <div className='trending-cards-container'>
          {trendingData ? 
          <div className='trending-card'>
            <div className='trending-img-container'>
              <Link to={`/anime/${trendingData[currentIndex]['mal_id']}`}>
                <img className='trending-img' src={trendingData[currentIndex]['images']['jpg']['large_image_url']} alt="" />
              </Link>
            </div>
            <div className='trending-info'>
              <h3 className='trending-title'>{trendingData[currentIndex]['title_english'] === null ? filterTitle(trendingData[currentIndex]['title_english']) : filterTitle(trendingData[currentIndex]['title_english'])}</h3>
              <p className='trending-synopsis'>{limitCharacters(trendingData[currentIndex]['synopsis'])}</p>
              <div className='read-more-link-container'>
                <Link className='read-more-link'>
                  Read More
                  <img src={arrowIcon} alt="" />
                </Link>
              </div>
              <CarouselButtons 
                setCurrentIndex={setCurrentIndex}
              />
            </div>
          </div> :
            <h1>...Loading Trending Anime</h1> 
          }
        </div>
      </section>
  )
}