import React, { useState, useEffect, useRef } from 'react'
import Card from '../components/Card'

function TopAnime() {
  const [animeData, setAnimeData] = useState(null)
  const [allCards, setAllCards] = useState('')
  const shouldLog = useRef(true)

  // FUNCTION: Retrieves API data
  const getAnimeData = async () => {
    try {
      const response = await fetch("https://api.jikan.moe/v4/top/anime?filter=rank")
      const data = await response.json()
      setAnimeData(data.data)
      console.log('data received')
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

  // Call API once and set animeData state
  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false;
      getAnimeData()
    }
  }, [])

  // Set allCards once data is in animeData state
  useEffect(() => {
    if (!animeData) {
      return
    } else {
      setAllCards(animeData.map(anime => {
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
  }, [animeData])

  return (
    <div className='top-anime-container'>
      {(animeData ? allCards : <h1>...Loading</h1>)}
    </div>
  )
}

export default TopAnime