import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Characters({styles, anime, id}) {
  const [charactersData, setCharactersData] = useState(null)
  const [characterCards, setCharacterCards] = useState(null)
  const [allCharacters, setAllCharacters] = useState(false)

  useEffect(() => {
    if (anime) {
      const controller = new AbortController();
      const signal = controller.signal;

      const timer = setTimeout(() => {
          fetch(`https://api.jikan.moe/v4/anime/${id}/characters`, {
            signal: signal
          })
            .then(response => {
              if (response.ok) return response.json()
              throw response
            })
            .then(data => setCharactersData(data.data))
            .catch(() => {
              if (signal.aborted) {
                console.log('The user aborted the request')
              } else {
                console.error('The request failed')
              }
            })
      }, 600)
      return () => {
        controller.abort()
        clearTimeout(timer)
      }
    }
  }, [id, anime])

  useEffect(() => {
    if (charactersData && !allCharacters) {
      setCharacterCards(charactersData.map((character, index) => {
        if (index < 12) {
          return (
            <div key={character['character']['name']} className={styles.characterCard}>
              <div className={styles.characterImgContainer}>
                <Link to={`/character/${character['character']['mal_id']}`} target="_blank" rel="noopener noreferrer">
                  <img className={styles.characterImg} src={character['character']['images']['jpg']['image_url']} alt="" />
                </Link>
              </div>
              <div className={styles.characterInfo}>
                <h3>{character['character']['name']}</h3>
                <div className={styles.voiceActor}>{character['voice_actors'].map(voiceActor => voiceActor['language'] === 'Japanese' ? voiceActor['person']['name'] : null)}</div>
                <div className={styles.characterType}>{character['role']}</div>
              </div>
            </div>
          )
        } else return null
      }))
    } else if (charactersData && allCharacters) {
      setCharacterCards(charactersData.map((character, index) => {
          return (
            <div key={character['character']['name'] + [index]} className={styles.characterCard}>
              <div className={styles.characterImgContainer}>
                <Link to={`/character/${character['character']['mal_id']}`}>
                  <img className={styles.characterImg} src={character['character']['images']['jpg']['image_url']} alt="" />
                </Link>
              </div>
              <div className={styles.characterInfo}>
                <h3>{character['character']['name']}</h3>
                <div className={styles.voiceActor}>{character['voice_actors'].map(voiceActor => voiceActor['language'] === 'Japanese' ? voiceActor['person']['name'] : null)}</div>
                <div className={styles.characterType}>{character['role']}</div>
              </div>
            </div>
          )
      }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charactersData, allCharacters])

  return (
    <div className={`${styles.charactersSection} characters`}>
      <h2 className={styles.sectionTitle}>Characters</h2>
      {charactersData && charactersData.length > 0 ? 
        <div className={styles.charactersContainer}>
          {characterCards}
        </div>
      : <p className={styles.defaultText}>No characters available.</p>}
      {charactersData && 
      <div className={styles.charactersBtnContainer}>       
          <button 
            onClick={() => setAllCharacters(prev => !prev)} 
            className={styles.charactersBtn}
          >
            {allCharacters ? 'See Less Characters' : 'See Full Character List'}
          </button>
      </div>}
    </div>
  )
}
