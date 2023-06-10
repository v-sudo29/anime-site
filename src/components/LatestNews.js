import React, { useState, useEffect } from 'react'
import limitCharacters from '../helpers/limitCharacters'

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
          <div key={news.title} className='news-card'>
            <h1 className='news-title'>{news['title']}</h1>
            <div className='news-image-container'>
              <img className='news-image' src={`${news.image}`} alt="" />
              <p className='news-text'>{limitCharacters(news.text)}</p>
            </div>
          </div>
        )
      }))
    }
  }, [newsData])
  return (
    <section className='news-container'>
      <h2>News</h2>
      <div className='news-cards-container'>
        {newsCards}
      </div>
    </section>
  )
}