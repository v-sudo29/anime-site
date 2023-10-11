import { useState, useEffect, useRef } from 'react'
import { SpinoffResponse } from '../types/fetchDataTypes/fetchSpinoffTypes'
import { ISpinoffData } from '../types/stateTypes/AnimeDetailTypes'

export default function useFetchSpinoff(spinOffIds : number[]) {
  const [spinOffData, setSpinOffData] = useState<ISpinoffData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const intervalCounter = useRef(0)

  // TODO: create context to persist spinoff data
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const interval = setTimeout(() => setInterval(() => {
      if (spinOffIds.length > 0 && intervalCounter.current < spinOffIds.length) {
        if (!loading) setLoading(true)
        const index = intervalCounter.current
        try {
          fetch(`https://api.jikan.moe/v4/anime/${spinOffIds[index]}`, {
            signal: signal
          })
            .then(response => {
              if (response.ok) return response.json()
              throw response
            })
            .then((data: SpinoffResponse) => {
              setSpinOffData(prev => [...prev, {
                id: spinOffIds[index],
                name: data.data['titles'][0]['title'] ? data.data['titles'][0]['title'] : null,
                image: data.data['images']['jpg']['large_image_url'],
                type: 'spinoff'
              }])
            })
        } catch (error) {
          if (signal.aborted) console.log('The user aborted the request', error)
          else {
            console.error('The request failed', error)
            setError(true)
          }
        } finally {
          intervalCounter.current += 1
          if (intervalCounter.current === spinOffIds.length - 1) setLoading(false)
        }
      } else {
        window.clearInterval(interval)
      }
    }, 2500), 5000)

    return () => {
      clearInterval(interval)
      controller.abort()
    }
  }, [spinOffIds])
  
  return { spinOffData, loading, error }
}
