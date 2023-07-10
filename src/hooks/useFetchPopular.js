import {useState, useEffect} from 'react'

function useFetchPopular() {
  const [popularData, setPopularData] = useState(null)
  const [popularLoading, setPopularLoading] = useState(false)
  const [popularError, setPopularError] = useState(false)

  useEffect(() => {
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
          .then(data => {
            setPopularData(data.data)
          })
          .catch(() => {
            setPopularError(true)
            if (signal.aborted) console.log('The user aborted the request')
            else console.error('The request failed')
          })
          .finally(() => setPopularLoading(false))
    }, 1400)

    return () => {
      controller.abort()
      clearTimeout(timer)
    }
  }, [])

  
  return { popularData, popularLoading, popularError }
}

export default useFetchPopular
