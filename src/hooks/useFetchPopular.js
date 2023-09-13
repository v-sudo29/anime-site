import {useState, useEffect} from 'react'

function useFetchPopular() {
  const [popularData, setPopularData] = useState(null)
  const [popularLoading, setPopularLoading] = useState(false)
  const [popularError, setPopularError] = useState(false)

  useEffect(() => {
    const localDataExists = JSON.parse(localStorage.getItem('defaultData'))

    if (!popularData && !localDataExists) {
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
              setPopularData(data)
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
    } else {
      setPopularLoading(true)
      setPopularData(localDataExists.popularData)
      setPopularLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  
  return { popularData, popularLoading, popularError, setPopularData }
}

export default useFetchPopular
