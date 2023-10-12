import React from 'react'
import { Link } from 'react-router-dom'
import { Voice } from '../../types/fetchDataTypes/fetchCharacterDetailTypes'

interface VoiceActorCardProps {
  styles: CSSModuleClasses
  actor: Voice
}

const VoiceActorCard = ({ styles, actor }: VoiceActorCardProps) => {
  return (
    <Link
      key={actor['person']['name']}
      to={actor['person']['url']}
      className={styles.card}
      target="_blank" rel="noopener noreferrer"
    >
      <div className={styles.imageContainer}>
        <img className={styles.image} src={actor['person']['images']['jpg']['image_url']} alt={`${actor['person']['name']}`} />
      </div>
      <div className={styles.actorInfo} >
        <div className={styles.name}>{actor['person']['name']}</div>
        <div className={styles.language}>{actor['language']}</div>
      </div>
    </Link>
  )
}

export default VoiceActorCard