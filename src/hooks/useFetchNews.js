import { useState, useEffect } from 'react'

function useFetchNews() {
  const [newsData, setNewsData] = useState(null)
  const [newsLoading, setNewsLoading] = useState(false)
  const [newsError, setNewsError] = useState(null)

  async function fetchNews() {
    try {
      const data = await import('../anime-news.json')
      setNewsData(data.news)
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