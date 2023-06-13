import React, { useState, useEffect, useRef } from 'react'
import filterTitle from '../helpers/filterTitle'

export default function MostPopular({popularData, setPopularData}) {
  const [popularCards, setPopularCards] = useState(null)
  const runOnce = useRef(false)
  const pageCount = useRef(1)

  function loadMoreAnime() {
    fetch(`https://api.jikan.moe/v4/top/anime?filter=bypopularity&page=${pageCount.current}`)
        .then(res => res.json())
        .then(data => setPopularData(prevData => [...prevData, ...data.data]))
  }

  useEffect(() => {
    if (popularData && !runOnce.current) {
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
      runOnce.current = true
      pageCount.current = 2
    } else if (popularData && runOnce.current) {
      
      // Set new popular cards
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

        if (pageCount.current !== 5) {
          pageCount.current += 1
        }
    }
  }, [popularData])

  return (
    <div className='popular-container'>
      <h2>Top 100 Most Popular Anime</h2>
      <div className='popular-cards-container'>
        {popularCards}
      </div>
      {pageCount.current !== 5 ? 
      <button 
        onClick={loadMoreAnime} 
        className='see-more-btn' 
        type="button"> 
      See More
      </button>
      : null
      }
    </div>
  )
}