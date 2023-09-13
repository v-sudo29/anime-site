import { useState, useEffect } from 'react'

export default function useFetchCharacters(anime, id) {
  const [charactersData, setCharactersData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (anime) {
      const controller = new AbortController();
      const signal = controller.signal;
      
      setLoading(true)
      const timer = setTimeout(() => {
          fetch(`https://api.jikan.moe/v4/anime/${id}/characters`, {signal: signal})
            .then(response => {
              if (response.ok) return response.json()
              throw response
            })
            .then(data => setCharactersData(data.data))
            .catch(() => {
              if (signal.aborted) {
                console.log('The user aborted the request')
              } else {
                console.error('The request failed')
                setError(true)
              }
            })
      }, 700)
      
      return () => {
        controller.abort()
        clearTimeout(timer)
      }
    }
  }, [anime, id])

  return { charactersData, loading, error }
}
