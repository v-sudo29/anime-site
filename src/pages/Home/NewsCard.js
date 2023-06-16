import React from 'react'

export default function NewsCard({news}) {
  return (
    <div className='home-news-card'>
      <div className='home-news-image-container'>
        <img className='home-news-image' src={`${news.image}`} alt="" />
      </div>
      <span className='home-news-date'>{news.date}</span>
      <h3 className='home-news-title'>{news['title']}</h3>
    </div>
  )
}
