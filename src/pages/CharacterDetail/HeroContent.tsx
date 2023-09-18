import React from 'react'
import { CharacterDetailData } from '../../types/fetchDataTypes/fetchCharacterDetailTypes'

interface IHeroContent {
  styles: CSSModuleClasses
  character: CharacterDetailData
}

export default function HeroContent({ styles, character }: IHeroContent) {
  return (
    <div className={styles.heroContent}>
      <div className={styles.heroContainer}>
        <div className={styles.imgContainer}>
          <img className={styles.characterImg} src={`${character['images']['jpg']['image_url']}`} alt="" />
        </div>
        <div className={styles.nameAndRole}>
          <h1 className={styles.name}>{character['name']}</h1>
          <div className={styles.role}>{character['anime'][0]['role']}</div>
        </div>
      </div>
    </div>
  )
}
