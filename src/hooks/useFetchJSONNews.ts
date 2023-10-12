import { useState, useEffect } from 'react'
import { JSONNewsResponse, News } from '../types/fetchDataTypes/fetchNewsTypes'

function useFetchNews() {
  const [newsData, setNewsData] = useState<JSONNewsResponse | null>(null)
  const [newsLoading, setNewsLoading] = useState(false)
  const [newsError, setNewsError] = useState(false)

  // TODO: move data to context, store in localStorage
  async function fetchNews() {
    try {
      const data: JSONNewsResponse = await import('../anime-news.json')
      setNewsData(data)
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