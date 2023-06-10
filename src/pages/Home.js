import React, { useState, useEffect, useRef } from 'react'
import Trending from '../components/Trending'
import Upcoming from '../components/Upcoming'
import NewsCarousel from '../components/NewsCarousel'

function Home() {
  const [trendingData, setTrendingData] = useState(null)
  const [upcomingData, setUpcomingData] = useState(null)
  const [newsData, setNewsData] = useState(null)

  const runOnce = useRef(false)

  async function fetchTrending() {
    const LIMIT_NUMBER = 6
    const trendingURL = `https://api.jikan.moe/v4/top/anime?filter=airing&limit=${LIMIT_NUMBER}`
    
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
    const LIMIT_NUMBER = 6
    const upcomingURL = `https://api.jikan.moe/v4/top/anime?filter=upcoming&limit=${LIMIT_NUMBER}`
    
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='home-container'>
      <h1>Home page</h1>
      <Trending trendingData={trendingData}/>
      <Upcoming upcomingData={upcomingData}/>
      <NewsCarousel newsData={newsData}/>
    </div>
  )
}

export default Home