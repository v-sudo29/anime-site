import React, { useState, useEffect, useRef } from 'react'
import filterTitle from '../helpers/filterTitle'
import limitCharacters from '../helpers/limitCharacters'

function Home() {
  const [trendingData, setTrendingData] = useState(null)
  const [trendingCards, setTrendingCards] = useState(null)
  const [upcomingData, setUpcomingData] = useState(null)
  const [upcomingCards, setUpcomingCards] = useState(null)
  const [newsData, setNewsData] = useState(null)
  const [newsCards, setNewsCards] = useState(null)

  const runOnce = useRef(false)

  async function fetchTrending() {
    const trendingURL = 'https://api.jikan.moe/v4/top/anime?filter=airing&limit=5'
    
    try {
      const res = await fetch(trendingURL)
      const data = await res.json()
      setTrendingData(data.data)
    }
    catch (error) {
      console.error(error)
    }
  }

  async function fetchUpcoming() {
    const upcomingURL = 'https://api.jikan.moe/v4/top/anime?filter=upcoming&limit=5'
    
    try {
      const res = await fetch(upcomingURL)
      const data = await res.json()
      setUpcomingData(data.data)
    }
    catch (error) {
      console.error(error)
    }
  }

  async function fetchNews() {
    try {
      const res = await import('../anime-news.json')
      
      // Convert object to objects in array
      const newData = Object.keys(res).map(key => {
        return res[key]
      })

      // Remove last two indexes (length and default)
      const secondToLastIndex = newData.length - 2
      newData.splice(secondToLastIndex, 2)
      
      setNewsData(newData)
    }
    catch (error) {
      console.error(error)
    }
  }

  async function fetchAllData() {
    fetchTrending()
    await fetchUpcoming()
    fetchNews()
  }

  // Fetch API data
  useEffect(() => {
    if (!runOnce.current) {
      fetchAllData()
      runOnce.current = true
    }
  }, [])

  // Set trendingCards from trendingData
  useEffect(() => {
    if (trendingData) {
      setTrendingCards(trendingData.map(anime => {
        return (
          <div key={anime['mal_id']} className='trending-card'>
            <h3 className='trending-title'>{anime['title_english'] === null ? filterTitle(anime['title']) : filterTitle(anime['title_english'])}</h3>
            <div className='trending-image-container'>
              <img className='trending-img' src={`${anime['images']['jpg']['large_image_url']}`} alt="" />
            </div>
          </div>
        )
      }))
    }
  }, [trendingData])

  // Set upcomingCards from upcomingData
  useEffect(() => {
    if (upcomingData) {
      setUpcomingCards(upcomingData.map(anime => {
        return (
          <div key={anime['mal_id']} className='upcoming-card'>
            <h3 className='upcoming-title'>{anime['title_english'] === null ? filterTitle(anime['title']) : filterTitle(anime['title_english'])}</h3>
            <div className='upcoming-image-container'>
              <img className='upcoming-img' src={`${anime['images']['jpg']['large_image_url']}`} alt="" />
            </div>
          </div>
        )
      }))
    }
  }, [upcomingData])

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
    <div className='home-container'>
      <h1>Home page</h1>

    {/* TRENDING CONTAINER */}
      <section className='trending-container'>
        <h2>Trending Now</h2>
        <div className='trending-cards-container'>
          {trendingCards}
        </div>
      </section>

    {/* UPCOMING CONTAINER */}
      <section className='upcoming-container'>
        <h2>Upcoming Anime</h2>
        <div className='upcoming-cards-container'>
          {upcomingCards}
        </div>
      </section>

    {/* NEWS CONTAINER */}
      <section className='news-container'>
        <h2>News</h2>
        <div className='news-cards-container'>
          {newsCards}
        </div>
      </section>

    </div>
  )
}

export default Home