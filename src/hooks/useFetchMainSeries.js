import { useState, useEffect, useRef } from 'react'

export default function useFetchMainSeries(mainIdsType) {
  const [mainData, setMainData] = useState([])
  const intervalCounter = useRef(0)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const interval = setTimeout(() => setInterval(() => {
      if (mainIdsType.length > 0 && intervalCounter.current < mainIdsType.length) {
        const index = intervalCounter.current

        try {
          fetch(`https://api.jikan.moe/v4/anime/${mainIdsType[index]['id']}`, {
            signal: signal
          })
            .then(response => {
              if (response.ok) return response.json()
              throw response
            })
            .then(data => setMainData(prev => [...prev, {
              id: mainIdsType[index]['id'],
              type: mainIdsType[index]['type'],
              name: data.data['titles'][0]['title'] ? data.data['titles'][0]['title'] : null,
              image: data.data['images']['jpg']['large_image_url']
            }]))
        } catch (error) {
          console.error(error)
        } finally {
          intervalCounter.current += 1 
        }  
      } else {
          window.clearInterval(interval)
        }
      }, 3000), 3000)
      return () => {
        clearInterval(interval)
        controller.abort()
      }

  }, [mainIdsType])

  return { mainData }
}
