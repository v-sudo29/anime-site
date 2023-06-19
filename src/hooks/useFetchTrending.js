import { useEffect, useState } from 'react'
import delay from '../helpers/delay.js'

function useFetchTrending(LIMIT_NUMBER = 6) {
  const [trendingData, setTrendingData] = useState(null)
  const [trendingLoading, setTrendingLoading] = useState(false)
  const [trendingError, setTrendingError] = useState(false)

  async function fetchTrending() {
    const trendingURL = `https://api.jikan.moe/v4/top/anime?filter=airing&limit=${LIMIT_NUMBER}`
    
    try {
      await delay(800)
      const res = await fetch(trendingURL)
      const data = await res.json()
      setTrendingData(data.data)

    }
    catch (error) {
      setTrendingError(true)
      console.error(error)
    }
    finally {
      setTrendingLoading(false)
    }
  }

  useEffect(() => {
    if (!trendingData) {
      setTrendingLoading(true)
      fetchTrending()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [LIMIT_NUMBER])

  return { trendingData, trendingLoading, trendingError }
}

export default useFetchTrending