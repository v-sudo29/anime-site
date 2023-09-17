import { useState, useEffect } from 'react'
import { AnimeDetailData } from '../types/fetchDataTypes/fetchAnimeDetailTypes'
import { FetchCharactersResponse, Datum } from '../types/fetchDataTypes/fetchCharactersTypes'

export default function useFetchCharacters(anime: AnimeDetailData, id: string | undefined) {
  const [charactersData, setCharactersData] = useState<Datum[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (anime && id) {
      const controller = new AbortController();
      const signal = controller.signal;
      
      setLoading(true)
      const timer = setTimeout(() => {
          fetch(`https://api.jikan.moe/v4/anime/${id}/characters`, {signal: signal})
            .then(response => {
              if (response.ok) return response.json()
              throw response
            })
            .then((data: FetchCharactersResponse) => {
              setCharactersData(data.data)
              console.log((data))
            })
            .catch((error) => {
              if (signal.aborted) {
                console.log('The user aborted the request', error)
              } else {
                console.error('The request failed', error)
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
