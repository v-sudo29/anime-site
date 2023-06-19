import {useState, useEffect} from 'react'
import delay from '../helpers/delay'

function useFetchPopular() {
  const [popularData, setPopularData] = useState(null)
  const [popularLoading, setPopularLoading] = useState(false)
  const [popularError, setPopularError] = useState(false)

  // Fetch and set popular data
  async function fetchPopular() {
    const popularURL = `https://api.jikan.moe/v4/top/anime?filter=bypopularity`
    try {
      await delay(1400)
      const res = await fetch(popularURL)
      const data = await res.json()

      setPopularData(data.data)
    } 
    catch (error) {
      setPopularError(true)
      console.error(error)
    }
    finally {
      setPopularLoading(false)
    }
  }

  useEffect(() => {
    setPopularLoading(true)
    fetchPopular()
  }, [])

  
  return { popularData, popularLoading, popularError }
}

export default useFetchPopular
