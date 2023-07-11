import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function useFetchAnime() {
  const params = useParams()
  const [anime, setAnime] = useState(null)
  const [animeLoading, setAnimeLoading] = useState(false)
  const [animeError, setAnimeError] = useState(false)

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setAnimeLoading(true)
    const timer = setTimeout(() => {
      fetch(`https://api.jikan.moe/v4/anime/${params.id}/full`, { signal: signal })
        .then(response => {
          if (response.ok) return response.json()
          if (response.status === 429) console.log('429 error, too many requests!')
          throw response
        })
        .then(data => {
          setAnime(data.data)
          document.title = data.data.title
        })
        .catch(() => {
          if (signal.aborted) {
            console.log('The user aborted the request')
          } else {
            console.error('The request failed')
            setAnimeError(true)
          }
        })
        .finally(() => setAnimeLoading(false))
    }, 100)
    return () => {
      controller.abort()
      clearTimeout(timer)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { anime, animeLoading, animeError }
}
