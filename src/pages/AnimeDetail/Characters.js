import React, { useState, useEffect } from 'react'

export default function Characters({styles, anime, id}) {
  const [charactersData, setCharactersData] = useState(null)
  const [characterCards, setCharacterCards] = useState(null)
  const [allCharacters, setAllCharacters] = useState(false)

  useEffect(() => {
    if (anime) {
      setTimeout(() => {
        fetch(`https://api.jikan.moe/v4/anime/${id}/characters`)
        .then(res => res.json())
        .then(data => setCharactersData(data.data))
      }, 600)
    }
  }, [id, anime])

  useEffect(() => {
    if (charactersData && !allCharacters) {
      setCharacterCards(charactersData.map((character, index) => {
        if (index < 12) {
          return (
            <div key={character['character']['name']} className={styles.characterCard}>
              <div className={styles.characterImgContainer}>
                <a href={`/character/${character['character']['mal_id']}`} target="_blank" rel="noopener noreferrer">
                  <img className={styles.characterImg} src={character['character']['images']['jpg']['image_url']} alt="" />
                </a>
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
      setCharacterCards(charactersData.map(character => {
          return (
            <div key={character['character']['name']} className={styles.characterCard}>
              <div className={styles.characterImgContainer}>
                <a href={`/character/${character['character']['mal_id']}`}>
                  <img className={styles.characterImg} src={character['character']['images']['jpg']['image_url']} alt="" />
                </a>
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
      <div className={styles.charactersContainer}>
        {charactersData ? characterCards : null}
      </div>
      <div className={styles.charactersBtnContainer}>
        <button onClick={() => setAllCharacters(prev => !prev)} className={styles.charactersBtn}>{allCharacters ? 'See Less Characters' : 'See Full Character List'}</button>
      </div>
    </div>
  )
}
