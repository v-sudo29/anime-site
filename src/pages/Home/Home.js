import React, { useState, useEffect, useRef } from 'react'
import SearchBar from '../../components/SearchBar'
import LatestNews from './LatestNews'
import TrendingCarousel from './TrendingCarousel'
import Upcoming from './Upcoming'
import MostPopular from './MostPopular'

function Home() {
  const [trendingData, setTrendingData] = useState(null)
  const [upcomingData, setUpcomingData] = useState(null)
  const [popularData, setPopularData] = useState(null)
  const inputValue = useRef(null)
  const runOnce = useRef(false)

  // Fetch and set trending data
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

  // Fetch and set upcoming data
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

  // Fetch and set popular data
  async function fetchPopular() {
    const popularURL = `https://api.jikan.moe/v4/top/anime?filter=bypopularity`
    try {
      const res = await fetch(popularURL)
      const data = await res.json()

      setPopularData(data.data)
    } catch (error) {console.error(error)}
  }

  // Fetch all data
  async function fetchAllData() {
    await fetchTrending()
    await fetchUpcoming()
    await fetchPopular()
  }

  // Fetch API data once when page renders
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

        <SearchBar 
          placeholder={'Search for anime, characters, news...'}
          inputValue={inputValue}
          // TODO: create handleEnter function
        />
        <LatestNews/>
        <TrendingCarousel
          trendingData={trendingData}
        />
        <Upcoming 
          upcomingData={upcomingData}
        />
        <MostPopular popularData={popularData} setPopularData={setPopularData}/>
      </div>
    </div>
  )
}

export default Home