import React from 'react'
import styles from '../../styles/character-detail/HeroImage.module.css'
import { CharacterDetailData } from '../../types/fetchDataTypes/fetchCharacterDetailTypes'

const HeroImage = ({ character } : { character: CharacterDetailData }) => {
  return (
    <div className={styles.container}>
      <img className={styles.characterImg} src={`${character['images']['jpg']['image_url']}`} alt={`${character.name}`} />
    </div>
  )
}

export default HeroImage