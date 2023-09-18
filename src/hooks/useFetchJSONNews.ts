import { useState, useEffect } from 'react'
import { JSONNewsResponse, News } from '../types/fetchDataTypes/fetchNewsTypes'

function useFetchNews() {
  const [newsData, setNewsData] = useState<News[] | null>(null)
  const [newsLoading, setNewsLoading] = useState(false)
  const [newsError, setNewsError] = useState(false)

  async function fetchNews() {
    try {
      const data: JSONNewsResponse = await import('../anime-news.json')
      setNewsData(data.news)
    }
    catch (error) {
      setNewsError(true)
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