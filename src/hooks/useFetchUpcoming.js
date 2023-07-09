import {useState, useEffect } from 'react'
import delay from '../helpers/delay'

function useFetchUpcoming() {
  const [upcomingData, setUpcomingData] = useState(null)
  const [upcomingLoading, setUpcomingLoading] = useState(false)
  const [upcomingError, setUpcomingError] = useState(false)

  // Fetch and set upcoming data
  async function fetchUpcoming() {
    const LIMIT_NUMBER = 8
    const upcomingURL = `https://api.jikan.moe/v4/top/anime?filter=upcoming&limit=${LIMIT_NUMBER}`

    try {
      await delay(700)
      const res = await fetch(upcomingURL)
      const data = await res.json()
      setUpcomingData(data.data)
    }
    catch (error) {
      setUpcomingError(true)
      console.error(error)
    }
    finally {
      setUpcomingLoading(false)
    }
  }

  useEffect(() => {
    setUpcomingLoading(true)
    fetchUpcoming()
  }, [])

  return { upcomingData, upcomingLoading, upcomingError }
}

export default useFetchUpcoming