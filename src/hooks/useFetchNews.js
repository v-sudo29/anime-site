import { useState, useEffect } from 'react'

function useFetchNews() {
  const [newsData, setNewsData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

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
    catch (error) {setError(error)}
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchNews()
  }, [])

  return { newsData, loading, error }
}

export default useFetchNews