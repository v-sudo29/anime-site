import React, { useState, useEffect } from 'react'
import arrowIcon from '../../assets/arrow-icon.png'
import LoaderAnimation from '../../components/LoaderAnimation'

import { Link } from 'react-router-dom'

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
          <div key={news.title} className='home-news-card'>
            <div className='home-news-image-container'>
              <img className='home-news-image' src={`${news.image}`} alt="" />
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
        {newsCards ? newsCards : <div className='news-default-div'></div> }
      </div>
    </section>
  )
}