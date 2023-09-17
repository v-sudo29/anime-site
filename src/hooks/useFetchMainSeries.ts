import { useState, useEffect, useRef } from 'react'
import { IMainIdsType, IMainData } from '../types/stateTypes/AnimeDetailTypes'
import { MainSeriesResponse } from '../types/fetchDataTypes/fetchMainSeriesTypes'

export default function useFetchMainSeries(mainIdsType : IMainIdsType[] | null) {
  const [mainData, setMainData] = useState<IMainData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const intervalCounter = useRef(0)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const interval = setTimeout(() => setInterval(() => {
      if (mainIdsType && mainIdsType.length > 0 && intervalCounter.current < mainIdsType.length) {
        setLoading(true)
        const index = intervalCounter.current

        try {
          fetch(`https://api.jikan.moe/v4/anime/${mainIdsType[index]['id']}`, {
            signal: signal
          })
            .then(response => {
              if (response.ok) return response.json()
              throw response
            })
            .then((data: MainSeriesResponse) => {
              setMainData(prev => [...prev, {
                id: mainIdsType[index]['id'],
                type: mainIdsType[index]['type'],
                name: data.data['titles'][0]['title'] ? data.data['titles'][0]['title'] : null,
                image: data.data['images']['jpg']['large_image_url']
              }])
            })
        } catch (error) {
          if (signal.aborted) {
            console.log('The user aborted the request', error)
          } else {
            console.error('The request failed', error)
            setError(true)
          }
        } finally {
          intervalCounter.current += 1 
          if (intervalCounter.current === mainIdsType.length - 1) setLoading(false)
        }  
      } else {
          clearTimeout(interval)
        }
      }, 3000), 3000)
      return () => {
        clearTimeout(interval)
        controller.abort()
      }

  }, [mainIdsType])

  return { mainData, loading, error }
}
