import { useState, useEffect, useRef } from 'react'

export default function useFetchSpinoff(spinOffIds) {
  const [spinOffData, setSpinOffData] = useState([])
  const intervalCounter = useRef(0)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const interval = setTimeout(() => setInterval(() => {
      if (spinOffIds.length > 0 && intervalCounter.current < spinOffIds.length) {
        const index = intervalCounter.current
        try {
          fetch(`https://api.jikan.moe/v4/anime/${spinOffIds[index]}`, {
            signal: signal
          })
            .then(response => {
              if (response.ok) return response.json()
              throw response
            })
            .then(data => setSpinOffData(prev => [...prev, {
              id: spinOffIds[index],
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
    }, 2500), 5000)

    return () => {
      clearInterval(interval)
      controller.abort()
    }
  }, [spinOffIds])
  
  return { spinOffData }
}
