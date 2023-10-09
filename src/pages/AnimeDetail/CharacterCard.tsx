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
  const voiceActorData = (voiceActors.filter(voiceActor => voiceActor['language'] === 'Japanese'))[0]

  console.log(voiceActorData)
  return (
    <Link className={styles.characterCard} to={`/character/${id}`} target="_blank" rel="noopener noreferrer">
      <div className={styles.characterImgContainer}>
        <img className={styles.characterImg} src={imgSrc} alt={charName} />
      </div>
      <div className={styles.characterInfo}>
        <h3 className={styles.characterName}>{charName}</h3>
        <div className={styles.voiceActor}>
          {voiceActorData ? voiceActorData['person']['name'] : 'N/A'}
        </div>
        <div className={styles.characterType}>{character['role']}</div>
      </div>
    </Link>
  )
}
