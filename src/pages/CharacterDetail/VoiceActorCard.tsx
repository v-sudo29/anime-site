import React from 'react'
import { Link } from 'react-router-dom'
import { Voice } from '../../types/fetchDataTypes/fetchCharacterDetailTypes'

interface IVoiceActorCard {
  styles: CSSModuleClasses
  actor: Voice
}

export default function VoiceActorCard({ styles, actor }: IVoiceActorCard) {
  return (
    <Link
      key={actor['person']['name']}
      to={actor['person']['url']}
      className={styles.card}
      target="_blank" rel="noopener noreferrer"
    >
      <div className={styles.imageContainer}>
        <img className={styles.image} src={actor['person']['images']['jpg']['image_url']} alt="" />
      </div>
      <div className={styles.actorInfo} >
        <div className={styles.name}>{actor['person']['name']}</div>
        <div className={styles.language}>{actor['language']}</div>      </div>
    </Link>
  )
}
