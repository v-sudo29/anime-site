import { useEffect, useState } from 'react'

function useFetchTrending(LIMIT_NUMBER = 6) {
  const [trendingData, setTrendingData] = useState(null)
  const [trendingLoading, setTrendingLoading] = useState(false)
  const [trendingError, setTrendingError] = useState(false)

  useEffect(() => {
    const localDataExists = JSON.parse(localStorage.getItem('defaultData'))

    if (!localDataExists && !trendingData) {
      const controller = new AbortController();
      const signal = controller.signal;
      setTrendingLoading(true)

      const timer = setTimeout(() => {
        const trendingURL = `https://api.jikan.moe/v4/top/anime?filter=airing&limit=${LIMIT_NUMBER}`
  
          fetch(trendingURL, {signal: signal})
            .then(response => {
              if (response.ok) return response.json()
              if (response.status === 429) console.log('429 error, too many requests!')
              throw response
            })
            .then(data => {
              setTrendingData(data.data)
            })
            .catch(() => {
              setTrendingError(true)
              if (signal.aborted) console.log('The user aborted the request')
              else console.error('The request failed')
            })
            .finally(() => setTrendingLoading(false))
      }, 700)

      return () => {
        controller.abort()
        clearTimeout(timer)
      }
    }
    else if (localDataExists && !trendingData){
      setTrendingLoading(true)
      setTrendingData(localDataExists.trendingData)
      setTrendingLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [LIMIT_NUMBER])

  return { trendingData, trendingLoading, trendingError }
}

export default useFetchTrending