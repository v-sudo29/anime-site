import React from 'react'
import styles from '../../styles/character-detail/HeroImage.module.css'

import { CharacterDetailData } from '../../types/fetchDataTypes/fetchCharacterDetailTypes'

interface HeroImageProps {
  character: CharacterDetailData
}

const HeroImage = ({ character }: HeroImageProps) => {
  return (
    <div className={styles.container}>
      <img className={styles.characterImg} src={`${character['images']['jpg']['image_url']}`} alt="" />
    </div>
  )
}

export default HeroImage