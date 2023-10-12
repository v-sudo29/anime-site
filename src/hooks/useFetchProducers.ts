import { useState, useEffect, useRef } from 'react'
import { IProducersIdsType } from '../types/stateTypes/AnimeDetailTypes'
import { ProducerResponse } from '../types/fetchDataTypes/fetchProducersTypes'
import { IProducersData } from '../types/stateTypes/AnimeDetailTypes'

export default function useFetchProducers(producerIdsType: IProducersIdsType[]|  null, count: number, countUpdated: boolean) {
  const [producersData, setProducersData] = useState<IProducersData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const intervalCounter = useRef(0)

  // TODO: create context to persist main series data
  // Set delayed timer and interval to fetch producers info
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const interval = setTimeout(() => setInterval(() => {
      if (producerIdsType && intervalCounter.current < producerIdsType.length && countUpdated) {
        if (!loading) setLoading(true)
        const index = intervalCounter.current

        fetch(`https://api.jikan.moe/v4/producers/${producerIdsType[index]['id']}`,{
          signal: signal
        })
          .then(response => {
            if (response.ok) return response.json()
            throw response
          })
          .then((data: ProducerResponse) => {
              setProducersData(prev => [...prev, 
              {
                type: producerIdsType[index]['type'],
                name: data.data['titles'][0]['title'] ? data.data['titles'][0]['title'] : '-',
                image: data.data['images']['jpg']['image_url'],
                url: data.data['url']
              }]
            )
          })
          .catch((error) => {
            if (signal.aborted) {
              console.log('The user aborted the request', error)
            } else {
              console.error('The request failed', error)
              setError(true)
            }
          })
          .finally(() => {
            intervalCounter.current += 1
            if (intervalCounter.current === producerIdsType.length - 1) setLoading(false)
          })
      } else window.clearTimeout(interval)
    }, (count > 0 ? 1800 : 1400)), (((count + 1) * 3000) + 1000))

    return () => {
      clearTimeout(interval)
      controller.abort()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [producerIdsType, countUpdated])

  return { producersData, loading, error }
}
