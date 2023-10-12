import { useState, useEffect } from 'react'
import { SimilarResponse, SimilarDatum } from '../types/fetchDataTypes/fetchSimilarTypes'

export default function useFetchSimilar(id: string | undefined) {
  const [similarData, setSimilarData] = useState<SimilarDatum[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // TODO: move data to context, store in localStorage
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const timer = setTimeout(() => {
      setLoading(true)
      fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`, {
        signal: signal
      })
        .then(response => {
          if (response.ok) return response.json()
          throw response
        })
        .then((data: SimilarResponse) => {
          setSimilarData(data.data)
        })
        .catch((error) => {
          if (signal.aborted) console.log('The user aborted the request', error)
          else {
            console.error('The request failed', error)
            setError(true)
          }
        })
        .finally(() => setLoading(false))
    }, 3000)
    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [id])

  return { similarData, loading, error }
}
