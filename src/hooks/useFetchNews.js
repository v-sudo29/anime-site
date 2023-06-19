import { useState, useEffect } from 'react'

function useFetchNews() {
  const [newsData, setNewsData] = useState(null)
  const [newsLoading, setNewsLoading] = useState(false)
  const [newsError, setNewsError] = useState(null)

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
      setNewsError(error)
      console.error(error)
    }
    finally {
      setNewsLoading(false)
    }
  }

  useEffect(() => {
    setNewsLoading(true)
    fetchNews()
  }, [])

  return { newsData, newsLoading, newsError }
}

export default useFetchNews