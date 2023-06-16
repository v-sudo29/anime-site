import React, { useState, useEffect } from 'react'

export default function TrendingContent({trendingNews}) {
  const [trendingNewsCards, setTrendingNewsCards] = useState(null)

  // Set trending news cards when data available
  useEffect(() => {
    if (trendingNews) {
      setTrendingNewsCards(trendingNews.map((news, index) => {
        return (
          <div key={news.title + index} className='news-page-trending-card'>
            <img src={news.image} alt="" />
            <div className='news-page-trending-info'>
              <div>{news.date}</div>
              <h3>{news.title}</h3>
            </div>
          </div>
        )
      }))
    }
  }, [trendingNews])


  return (
    <div className='news-trending-container'>
      <h2>Trending Anime News</h2>
      <div className='news-trending-cards-container'>
        {trendingNewsCards ? trendingNewsCards : <>...Loading</>}
      </div>
    </div>
  )
}
