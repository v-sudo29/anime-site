import React, { useState, useEffect, useRef } from 'react'
import SearchBar from '../components/SearchBar'
import LatestNews from '../components/LatestNews'
import TrendingCarousel from '../components/TrendingCarousel'
import Upcoming from '../components/Upcoming'
import MostPopular from '../components/MostPopular'

function Home() {
  const [trendingData, setTrendingData] = useState(null)
  const [upcomingData, setUpcomingData] = useState(null)
  const [newsData, setNewsData] = useState(null)
  const [popularData, setPopularData] = useState(null)

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
    const LIMIT_NUMBER = 8
    // API endpoint not working
    // const upcomingURL = `https://api.jikan.moe/v4/top/anime?filter=upcoming&limit=${LIMIT_NUMBER}`
    const upcomingURL = `https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=${LIMIT_NUMBER}`

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
    catch (error) {console.error(error)}
  }

  async function fetchPopular() {
    const popularURL = `https://api.jikan.moe/v4/top/anime?filter=bypopularity`
    try {
      const res = await fetch(popularURL)
      const data = await res.json()

      setPopularData(data.data)
    } catch (error) {console.error(error)}
  }

  async function fetchAllData() {
    fetchTrending()
    await fetchUpcoming()
    fetchNews()
    await fetchPopular()
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
      <div className='home-hero-image'></div>
      <div className='home-content'>
        <SearchBar/>
        <LatestNews newsData={newsData}/>
        <TrendingCarousel trendingData={trendingData}/>
        <Upcoming upcomingData={upcomingData}/>
        <MostPopular popularData={popularData} setPopularData={setPopularData}/>
      </div>
    </div>
  )
}

export default Home