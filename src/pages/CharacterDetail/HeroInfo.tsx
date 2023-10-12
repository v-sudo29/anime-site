import React, { useEffect, useState } from 'react'
import styles from '../../styles/character-detail/HeroInfo.module.css'
import { CharacterDetailData } from '../../types/fetchDataTypes/fetchCharacterDetailTypes'

const HeroInfo = ({ character } : { character: CharacterDetailData }) => {
  const [biography, setBiography] = useState<string | null>(null)

  const extractBiography = (biography: string): string | null => {
    if (!biography) return null
    const filteredBio = biography.split('\n')

      .filter(string => (string.includes('.')))
      .filter(string => string.length > 30)
      .filter(string => !string.includes('Dislikes:'))
      .filter(string => !string.includes('Famous Quote:'))
      .filter(string => !string.includes('Age:'))
      .join('\n\n')

    return filteredBio
  }

  // When character data is available, extract biography from data
  useEffect(() => {
    if (character) setBiography(extractBiography(character.about))
  }, [character])

  if (character) {
    return (
      <div className={styles.container}>
        <h2 className={styles.characterName}>{character.name}</h2>
        <p className={styles.biography}>{biography ? biography : 'No biography available.'}</p>
      </div>
    )
  } else return <></>
}

export default HeroInfo