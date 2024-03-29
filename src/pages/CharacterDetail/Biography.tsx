import React, { useEffect, useState } from 'react'
import styles from '../../styles/character-detail/Biography.module.css'
import { CharacterDetailData } from '../../types/fetchDataTypes/fetchCharacterDetailTypes'

const Biography = ({ character } : { character: CharacterDetailData }) => {
  const [biography, setBiography] = useState<string | null>(null)

  function extractBiography(biography: string): string | null {
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

  useEffect(() => {
    if (character) setBiography(extractBiography(character.about))
  }, [character])

  if (character) {
    return (
      <>
        <h2 className={styles.sectionTitle}>Biography</h2>
        <p className={styles.biography}>{biography ?? 'No biography available.'}</p>
      </>
    )
  } else return <></>
}

export default Biography