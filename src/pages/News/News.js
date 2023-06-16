import React, { useState, useEffect } from 'react'
import ReadMoreBtn from '../../components/ReadMoreBtn'
import limitCharacters from '../../helpers/limitCharacters'

function News() {
  const [newsData, setNewsData] = useState(null)
  const [newsCards, setNewsCards] = useState(null)
  const [trendingNews, setTrendingNews] = useState(null)
  const [trendingNewsCards, setTrendingNewsCards] = useState(null)

  // Fetch news data
  async function fetchNews() {
    try {
      const res = await import('../../anime-news.json')

      // Convert object to objects in array
      const newData = Object.keys(res).map(key => {
        return res[key]
      })
      // Remove last two indexes (length and default)
      const secondToLastIndex = newData.length - 2
      newData.splice(secondToLastIndex, 2)
      
      setNewsData(newData)
    } catch (error) {console.error(error)}
  }

  // TODO: Fetch trending news data
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

  // Fetch data when page first loads
  useEffect(() => {
    if (!newsData && !trendingNews) {
      fetchNews()
      fetchTrendingNews()
      console.log('complete!')
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  // Set news cards when data available
  useEffect(() => {
    if (newsData) {
      setNewsCards(newsData.map((news, index) => {
        if (news.image === 'doesn\'t exist!') {
          return null
        }
        return (
          <div key={index} className='news-page-card'>
            <img src={news.image} alt="" />
            <div className='news-page-card-info'>
              <div>{news.date}</div>
              <h3>{news.title}</h3>
              <p>{limitCharacters(news.text)}</p>
            </div>
          </div>
        )
      }))
    }
  }, [newsData])

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
    <div className='news-container'>
      <div className='news-background-image'></div>
      <div className='news-content'>

        <div className='news-hero-container'>
          <div className='news-hero-image'></div>
          <div className='news-hero-info'>
            <div className='news-hero-text'>
              <div>March 21, 2020</div>
              <h2>Lorem ipsum dolor sit amet consectetur. Commodo elementum</h2>
            </div>
            <ReadMoreBtn />
          </div>
        </div>

        <div className='news-trending-container'>
          <h2>Trending Anime News</h2>
          <div className='news-trending-cards-container'>
            {trendingNewsCards ? trendingNewsCards : <>...Loading</>}
          </div>
        </div>

        <div className='all-news-container'>
          <h2>What's New?</h2>
          <div className='all-news-cards-container'>
            {newsCards ? newsCards : <>...Loading</>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default News