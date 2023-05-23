import React, { useState, useEffect, useRef } from 'react'
import Card from '../components/Card'

function TopAnime() {
  const [topAnimeData, setTopAnimeData] = useState(JSON.parse(localStorage.getItem('top anime data')) || null)
  const [allCards, setAllCards] = useState('')
  const shouldLog = useRef(true)

  const anime = 'https://api.jikan.moe/v4/anime'

  // FUNCTION: Retrieves API data
  const getAnimeData = async () => {

    if (!topAnimeData) {
      try {
        const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=rank&type=tv')
        const data = await response.json()

        setTopAnimeData(data.data)

        const res = await fetch(anime)
        const dataTwo = await res.json()
        console.log(dataTwo)

        // Store locally
        localStorage.setItem('top anime data', JSON.stringify(data.data))
        console.log('data set and stored')
      }
  
      catch (error) {
        console.error(error)
      }
    }
  }

  // FUNCTION: Take away certain characters from titles
  function filterTitle(title) {
    let thisTitle = title
    const newTitle = thisTitle.replace(/\./g, '').replace(/;/g, ' ').replace(/\[/g, '').replace(/\]/g, '')
    
    return newTitle
  }

  // User refreshes: Clear storage
  useEffect(() => {
    const clearStorage = (event) => {
      event.preventDefault()
      event.returnValue = ''
      window.localStorage.removeItem('top anime data')

      window.removeEventListener('beforeunload', clearStorage)
    }

    window.addEventListener('beforeunload', clearStorage)
  }, [])

  // Call API once and set animeData state
  useEffect(() => {
    if (shouldLog.current && !topAnimeData) {
      shouldLog.current = false;
      getAnimeData()
      console.log('get data ran!')
    }
  }, [])


  // Set allCards once data is in animeData state
  useEffect(() => {
    if (!topAnimeData) {
      return
    } else {
      setAllCards(topAnimeData.map(anime => {
        const newTitle = filterTitle(anime['title_english'])
        return (
          <Card
            id={anime['mal_id']}
            key={anime['mal_id']}
            image={anime['images']['jpg']['large_image_url']}
            title={newTitle}
            ranking={anime['rank']}
          />
        )
      }))
    }
  }, [topAnimeData])

  return (
    <div className='top-anime-container'>
      {(topAnimeData ? allCards : <h1>...Loading</h1>)}
    </div>
  )
}

export default TopAnime