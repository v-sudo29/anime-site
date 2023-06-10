import React, { useState, useEffect } from 'react'
import arrowIcon from '../assets/arrow-icon.png'

import { Link } from 'react-router-dom'

export default function LatestNews({newsData}) {
  const [newsCards, setNewsCards] = useState(null)

  // Set newsCards from newsData
  useEffect(() => {
    if (newsData) {
      setNewsCards(newsData.map(news => {
        if (news.image === 'doesn\'t exist!') {
          return null
        }
        return (
          <div key={news.title} className='home-news-card'>
            <div className='home-news-image-container'>
              <img className='home-news-image' src={`${news.image}`} alt="" />
              {/* <p className='home-news-text'>{limitCharacters(news.text)}</p> */}
            </div>
            <span className='home-news-date'>{news.date}</span>
            <h3 className='home-news-title'>{news['title']}</h3>
          </div>
        )
      }))
    }
  }, [newsData])

  return (
    <section className='home-news-container'>
      <div className='home-news-header'>
        <h2>Latest Anime News</h2>
        <Link className='more-news-link' to='/news'>
          More News
          <img src={arrowIcon} alt="" />
        </Link>
      </div>
      <div className='home-news-cards-container'>
        {newsCards}
      </div>
    </section>
  )
}