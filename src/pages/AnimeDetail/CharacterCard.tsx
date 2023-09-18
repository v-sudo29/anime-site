import React from 'react'
import { Link } from 'react-router-dom'
import { CharacterDatum } from '../../types/fetchDataTypes/fetchCharactersTypes'

interface ICharacterCard {
  styles: CSSModuleClasses
  character: CharacterDatum
}

export default function CharacterCard({ styles, character }: ICharacterCard) {
  const id = character['character']['mal_id']
  const imgSrc = character['character']['images']['jpg']['image_url']
  const charName = character['character']['name']
  const voiceActors = character['voice_actors']

  return (
    <div className={styles.characterCard}>
      <div className={styles.characterImgContainer}>
        <Link to={`/character/${id}`} target="_blank" rel="noopener noreferrer">
          <img className={styles.characterImg} src={imgSrc} alt={charName} />
        </Link>
      </div>
      <div className={styles.characterInfo}>
        <h3>{charName}</h3>
        <div className={styles.voiceActor}>{
          voiceActors.map(voiceActor => voiceActor['language'] === 'Japanese' && voiceActor['person']['name'])}
        </div>
        <div className={styles.characterType}>{character['role']}</div>
      </div>
    </div>
  )
}
