import { useState, useEffect, useRef } from 'react'
import { IMainIdsType, IMainData } from '../types/stateTypes/AnimeDetailTypes'
import { MainSeriesResponse } from '../types/fetchDataTypes/fetchMainSeriesTypes'

export default function useFetchMainSeries(mainIdsType : IMainIdsType[] | null) {
  const [mainData, setMainData] = useState<IMainData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const intervalCounter = useRef(0)

  // TODO: create context to persist main series data
  useEffect(() => {
    // Check localStorage if main series data exists
    const storedMainData = localStorage.getItem('mainSeries')

    // Fetch main series data if localStorage data does not exist
    if (!storedMainData) {
      const controller = new AbortController()
      const signal = controller.signal
  
      const interval = setTimeout(() => setInterval(async () => {
        if (mainIdsType && mainIdsType.length > 0 && intervalCounter.current < mainIdsType.length) {
          try {
            setLoading(true)
            const index = intervalCounter.current
            const url = `https://api.jikan.moe/v4/anime/${mainIdsType[index]['id']}`
            
            const response = await fetch(url, { signal: signal })
            const data: MainSeriesResponse = await response.json()
            
            // Set state from data
            const currentRelatedAnime = {
              id: mainIdsType[index]['id'],
              type: mainIdsType[index]['type'],
              name: data.data['titles'][0]['title'] ? data.data['titles'][0]['title'] : null,
              image: data.data['images']['jpg']['large_image_url']
            }
            setMainData(prev => [...prev, currentRelatedAnime])
          } catch (error) {
            if (signal.aborted) {
              console.log('The user aborted the request', error)
            } else {
              console.error('The request failed', error)
              setError(true)
            }
          } finally {
            intervalCounter.current += 1 
            if (mainIdsType.length > 0 && intervalCounter.current === mainIdsType.length - 1) {
              setLoading(false)
              localStorage.setItem('test', JSON.stringify({ test: 'test' }))
            }
          }
        } else {
          clearTimeout(interval)
        }
      }, 3000), 3000)

      return () => {
        clearTimeout(interval)
        controller.abort()
      }
    }

    // If stored data exists, check if stored mainIdsTypes id matches props mainIdsTypes
    // If not, then fetch new data
    if (storedMainData) {
      // console.log(JSON.parse(storedMainData))
    }
  }, [mainIdsType])

  return { mainData, loading, error }
}
