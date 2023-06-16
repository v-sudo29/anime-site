import React, { useState, useEffect } from 'react'

export default function TrendingContent() {
  const [trendingNews, setTrendingNews] = useState(null)
  const [trendingNewsCards, setTrendingNewsCards] = useState(null)

  // Fetching trending news data
  async function fetchTrendingNews() {
    try {
      const res = await import('../../anime-trending-news.json')

      // Convert object to objects in array
      const newData = Object.keys(res).map(key => {
        return res[key]
      })
      // Remove last two indexes (length and default)
      const secondToLastIndex = newData.length - 2
      newData.splice(secondToLastIndex, 2)
      
      setTrendingNews(newData)
    } catch (error) {console.error(error)}
  }

  useEffect(() => {
    if (!trendingNews) fetchTrendingNews()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


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
