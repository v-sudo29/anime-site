import { useState, useEffect } from 'react'
import { UpcomingResponse, UpcomingDatum } from '../types/fetchDataTypes/fetchUpcomingTypes'

function useFetchUpcoming() {
  const [upcomingData, setUpcomingData] = useState<UpcomingDatum[] | null>(null)
  const [upcomingLoading, setUpcomingLoading] = useState(false)
  const [upcomingError, setUpcomingError] = useState(false)

  useEffect(() => {
    const storageData = localStorage.getItem('defaultData')
    let parsedData
    
    if (storageData) parsedData = JSON.parse(storageData)
    else parsedData = null

    if (!upcomingData && !parsedData) {
      const controller = new AbortController();
      const signal = controller.signal;
      setUpcomingLoading(true)

      const timer = setTimeout(() => {
        const upcomingURL = `https://api.jikan.moe/v4/top/anime?filter=upcoming`

        fetch(upcomingURL, {signal: signal})
          .then(response => {
            if (response.ok) return response.json()
            if (response.status === 429) console.log('429 error, too many requests!')
            throw response
          })
          .then((data: UpcomingResponse) => {
            setUpcomingData(data.data)
          })
          .catch((error) => {
            if (signal.aborted) console.log('The user aborted the request', error)
            else {
              console.error('The request failed', error)
              setUpcomingError(true)
            }
          })
          .finally(() => setUpcomingLoading(false))
      }, 700)

      return () => {
        controller.abort()
        clearTimeout(timer)
      }
    } else if (!upcomingData && parsedData){
      setUpcomingLoading(true)
      setUpcomingData(parsedData.upcomingData)
      setUpcomingLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { upcomingData, upcomingLoading, upcomingError }
}

export default useFetchUpcoming