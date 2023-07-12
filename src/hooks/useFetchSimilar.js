import { useState, useEffect } from 'react'

export default function useFetchSimilar(id) {
  const [similarData, setSimilarData] = useState(null)
 
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const timer = setTimeout(() => {
      fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`, {
        signal: signal
      })
        .then(response => {
          if (response.ok) return response.json()
          throw response
        })
        .then(data => setSimilarData(data.data))
        .catch(() => {
          if (signal.aborted) {
            console.log('The user aborted the request')
          } else {
            console.error('The request failed')
          }
        })
    }, 2500)
    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [id])

  return { similarData }
}
