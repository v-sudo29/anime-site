import { useState, useEffect, useRef } from 'react'

export default function useFetchProducers(producerIdsType, count, countUpdated) {
  const [producersData, setProducersData] = useState([])
  const intervalCounter = useRef(0)

    // Set delayed timer and interval to fetch producers info
    useEffect(() => {
      const controller = new AbortController();
      const signal = controller.signal;
  
      const interval = setTimeout(() => setInterval(() => {
        if (producerIdsType && intervalCounter.current < producerIdsType.length && countUpdated) {
          const index = intervalCounter.current
  
          fetch(`https://api.jikan.moe/v4/producers/${producerIdsType[index]['id']}`,{
            signal: signal
          })
            .then(response => {
              if (response.ok) return response.json()
              throw response
            })
            .then(data => setProducersData(prev => [...prev, 
              {
                type: producerIdsType[index]['type'],
                name: data.data['titles'][0]['title'] ? data.data['titles'][0]['title'] : '-',
                image: data.data['images']['jpg']['image_url'],
                url: data.data['url']
              }]
            ))
            .catch(() => {
              if (signal.aborted) {
                console.log('The user aborted the request')
              } else {
                console.error('The request failed')
              }
            })
            .finally(() => intervalCounter.current += 1)
        } window.clearInterval(interval)
      }, (count > 0 ? 1800 : 1400)), (((count + 1) * 3000) + 1000))
  
      return () => {
        clearInterval(interval)
        controller.abort()
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [producerIdsType, countUpdated])

    return { producersData }
}
