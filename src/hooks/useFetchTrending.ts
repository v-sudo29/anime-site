import { useEffect, useState } from 'react'
import { TrendingResponse, TrendingDatum } from '../types/fetchDataTypes/fetchTrendingTypes'

function useFetchTrending(LIMIT_NUMBER = 6) {
  const [trendingData, setTrendingData] = useState<TrendingDatum[] | null>(null)
  const [trendingLoading, setTrendingLoading] = useState(false)
  const [trendingError, setTrendingError] = useState(false)

  useEffect(() => {
    const storageData = localStorage.getItem('defaultData')

    let parsedData
    if (storageData) parsedData = JSON.parse(storageData)
    else parsedData = null

    if (!parsedData && !trendingData) {
      const controller = new AbortController();
      const signal = controller.signal;
      setTrendingLoading(true)

      const timer = setTimeout(() => {
        const trendingURL = `https://api.jikan.moe/v4/top/anime?filter=airing&limit=${LIMIT_NUMBER}`
  
        fetch(trendingURL, { signal: signal })
          .then(response => {
            if (response.ok) return response.json()
            if (response.status === 429) console.log('429 error, too many requests!')
            throw response
          })
          .then((data: TrendingResponse) => {
            setTrendingData(data.data)
          })
          .catch(() => {
            if (signal.aborted) console.log('The user aborted the request')
            else {
              console.error('The request failed')
              setTrendingError(true)
            }
          })
          .finally(() => setTrendingLoading(false))
      }, 700)

      return () => {
        controller.abort()
        clearTimeout(timer)
      }
    }
    else if (parsedData && !trendingData) {
      setTrendingLoading(true)
      setTrendingData(parsedData.trendingData)
      setTrendingLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [LIMIT_NUMBER])

  return { trendingData, trendingLoading, trendingError }
}

export default useFetchTrending