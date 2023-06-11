import React, { useState, useEffect } from 'react'
import filterTitle from '../helpers/filterTitle'

export default function MostPopular({popularData}) {
  const [popularCards, setPopularCards] = useState(null)
  
  useEffect(() => {
    if (popularData) {
      setPopularCards(popularData.map((anime, index) => {
        return (
          <div key={`${anime['mal_id']}-popular`} className='popular-card'>
            <div className='popular-rank-number'>{index + 1}</div>
            <div className='popular-img-container'>
              <img className='popular-img' src={anime['images']['jpg']['large_image_url']} alt='' />
            </div>
            <div className='popular-info'>
              <div className='popular-title-and-type'>
                <h3 className='popular-title'>{anime['title_english'] === null ? filterTitle(anime['title']) : filterTitle(anime['title_english'])}</h3>
                <span className='popular-type'>TV Show</span>
              </div>
              <span className='popular-finished-date'>Finished &#x2022; 2009-2010</span>
            </div>
            <div className='popular-score'>
              {anime['score'].toString().length > 3 ? anime['score'].toString().substring(0, 3) : anime['score']}
            </div>
          </div>
        )
      }))
    }
  }, [popularData])



  return (
    <div className='popular-container'>
      <h2>Top 100 Most Popular Anime</h2>
      <div className='popular-cards-container'>
        {popularCards}
      </div>
      <button className='see-more-btn' type="button">See More</button>
    </div>
  )
}