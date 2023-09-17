import React, { useState } from 'react'
import styles from '../../styles/anime-detail/Characters.module.css'
import useFetchCharacters from '../../hooks/useFetchCharacters'
import CharacterCard from './CharacterCard'
import { AnimeDetailData } from '../../types/fetchDataTypes/fetchAnimeDetailTypes'

interface ICharacters {
  anime: AnimeDetailData
  id: string | undefined
}

export default function Characters({ anime, id } : ICharacters) {
  const { charactersData } = useFetchCharacters(anime, id)
  const [allCharacters, setAllCharacters] = useState(false)
  let characterCards = null

  if (charactersData && !allCharacters) characterCards = charactersData.map((character, index) => 
    (index < 12 && 
      <CharacterCard 
        key={character['character']['name']}
        styles={styles} 
        character={character}
      /> 
    ))

  if (charactersData && allCharacters) characterCards = charactersData.map(character => (
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
          {characterCards}
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
