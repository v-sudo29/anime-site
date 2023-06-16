import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NewsCard from './NewsCard'
import arrowIcon from '../../assets/arrow-icon.png'

export default function LatestNews() {
  const [newsData, setNewsData] = useState(null)
  const [newsCards, setNewsCards] = useState(null)

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
    }
    catch (error) {console.error(error)}
  }

  // Fetch news data
  useEffect(() => {
    if (!newsData) fetchNews()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Set newsCards from newsData
  useEffect(() => {
    if (newsData) {
      setNewsCards(newsData.map(news => {
        if (news.image === 'doesn\'t exist!') {
          return null
        }
        return (
          <NewsCard
            key={news.title}
            news={news}
          />
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
        {newsCards ? newsCards : <div className='home-news-default-div'></div> }
      </div>
    </section>
  )
}