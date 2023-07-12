import React, { useState } from 'react'
import styles from '../../styles/anime-detail/Characters.module.css'
import useFetchCharacters from '../../hooks/useFetchCharacters'
import CharacterCard from './CharacterCard'

export default function Characters({anime, id}) {
  const { charactersData } = useFetchCharacters(anime, id)
  const [allCharacters, setAllCharacters] = useState(false)
  let testCards = null

  if (charactersData && !allCharacters) testCards = charactersData.map((character, index) => 
    (index < 12 && 
      <CharacterCard 
        key={character['character']['name']}
        styles={styles} 
        character={character}
      /> 
    ))

  if (charactersData && allCharacters) testCards = charactersData.map(character => (
    <CharacterCard
      key={character['character']['name']}
      styles={styles} 
      character={character}
    />
  ))  

  return (
    <div className={`${styles.charactersSection} characters`}>
      <h2 className={styles.sectionTitle}>Characters</h2>
      {charactersData && charactersData.length > 0 ? 
        <div className={styles.charactersContainer}>
          {testCards}
        </div>
      : <p className={styles.defaultText}>No characters available.</p>
      }
      {charactersData && 
      <div className={styles.charactersBtnContainer}>       
          <button 
            onClick={() => setAllCharacters(prev => !prev)} 
            className={styles.charactersBtn}
          >
            {allCharacters ? 'See Less Characters' : 'See Full Character List'}
          </button>
      </div>
      }
    </div>
  )
}
