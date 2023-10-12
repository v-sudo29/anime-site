import React from 'react'
import styles from '../../styles/character-detail/CharacterName.module.css'
import { CharacterDetailData } from '../../types/fetchDataTypes/fetchCharacterDetailTypes'

const CharacterName = ({ character } : { character: CharacterDetailData}) => {
  return <h2 className={styles.characterName}>{character?.name}</h2>
}

export default CharacterName