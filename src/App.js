import React, { useState, useEffect, useRef } from 'react'
import Card from './components/Card'
import './App.css'

function App() {
  const [animeData, setAnimeData] = useState('')
  const [allCards, setAllCards] = useState('')
  const shouldLog = useRef(true)

  // FUNCTION: Retrieves API data
  const getAnimeData = async () => {
    try {
      const response = await fetch("https://api.jikan.moe/v4/top/anime?filter=rank")
      const data = await response.json()
      setAnimeData(data.data)
    }
    catch (error) {
      console.error(error)
    }
  }

  // FUNCTION: Take away certain characters from titles
  function filterTitle(title) {
    let thisTitle = title
    const newTitle = thisTitle.replace(/\./g, '').replace(/;/g, ' ').replace(/\[/g, '').replace(/\]/g, '')
    
    return newTitle
  }

  // Call API once
  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false;
      getAnimeData()
    }
  }, [])

  useEffect(() => {
    if (typeof animeData !== 'object') {
      return
    } else {
      setAllCards(animeData.map(anime => {
        const newTitle = filterTitle(anime['title_english'])
        return (
          <Card
            key= {anime['mal_id']}
            image={anime['images']['jpg']['large_image_url']}
            title={newTitle}
            ranking={anime['rank']}
          />
        )
      }))
    }
  }, [animeData])

  return (
    <div className='App'>
      {allCards}
    </div>
  )
}

export default App