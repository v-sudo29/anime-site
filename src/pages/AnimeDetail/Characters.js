import React, { useState, useEffect } from 'react'
import styles from '../../styles/anime-detail/Characters.module.css'
import useFetchCharacters from '../../hooks/useFetchCharacters'
import CharacterCard from './CharacterCard'

export default function Characters({anime, id}) {
  const { charactersData } = useFetchCharacters(anime, id)
  const [characterCards, setCharacterCards] = useState(null)
  const [allCharacters, setAllCharacters] = useState(false)

  useEffect(() => {
    if (charactersData && !allCharacters) {
      setCharacterCards(charactersData.map((character, index) => 
        (index < 12 && 
          <CharacterCard 
            key={character['character']['name']}
            styles={styles} 
            character={character}
          /> 
        )))
    } 
    if (charactersData && allCharacters) {
      setCharacterCards(charactersData.map((character, index) => (
        <CharacterCard
          key={character['character']['name']}
          styles={styles} 
          character={character}
        />
      )))
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
