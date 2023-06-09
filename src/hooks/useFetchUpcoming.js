import {useState, useEffect } from 'react'

function useFetchUpcoming() {
  const [upcomingData, setUpcomingData] = useState(null)
  const [upcomingLoading, setUpcomingLoading] = useState(false)
  const [upcomingError, setUpcomingError] = useState(false)

  useEffect(() => {
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
          .then(data => {
            setUpcomingData(data.data)
          })
          .catch(() => {
            setUpcomingError(true)
            if (signal.aborted) console.log('The user aborted the request')
            else console.error('The request failed')
          })
          .finally(() => setUpcomingLoading(false))
    }, 700)

    return () => {
      controller.abort()
      clearTimeout(timer)
    }
  }, [])

  return { upcomingData, upcomingLoading, upcomingError }
}

export default useFetchUpcoming