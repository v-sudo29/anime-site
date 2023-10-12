import { useState, useEffect } from 'react'
import { PopularResponse } from '../types/fetchDataTypes/fetchPopularTypes'

function useFetchPopular() {
  const [popularData, setPopularData] = useState<PopularResponse | null>(null)
  const [popularLoading, setPopularLoading] = useState(false)
  const [popularError, setPopularError] = useState(false)

  useEffect(() => {
    const storedData = localStorage.getItem('defaultData')

    let parsedData
    if (storedData) parsedData = JSON.parse(storedData)
    else parsedData = null
    
    if (!popularData && !parsedData) {
      const controller = new AbortController();
      const signal = controller.signal;
      setPopularLoading(true)

      const timer = setTimeout(() => {
        const popularURL = `https://api.jikan.moe/v4/top/anime?filter=bypopularity`

        fetch(popularURL, {signal: signal})
          .then(response => {
            if (response.ok) return response.json()
            if (response.status === 429) console.log('429 error, too many requests!')
            throw response
          })
          .then((data: PopularResponse) => {
            setPopularData(data)
          })
          .catch((error) => {
            setPopularError(true)
            if (signal.aborted) console.log('The user aborted the request', error)
            else console.error('The request failed', error)
          })
          .finally(() => setPopularLoading(false))
      }, 1400)

      return () => {
        controller.abort()
        clearTimeout(timer)
      }
    } else if (!popularData && parsedData) {
      setPopularLoading(true)
      setPopularData(parsedData.popularData)
      setPopularLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  
  return { popularData, popularLoading, popularError, setPopularData }
}

export default useFetchPopular
