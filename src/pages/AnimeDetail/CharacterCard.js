import React from 'react'
import { Link } from 'react-router-dom'

export default function CharacterCard({styles, character}) {
  return (
    <div className={styles.characterCard}>
      <div className={styles.characterImgContainer}>
        <Link to={`/character/${character['character']['mal_id']}`} target="_blank" rel="noopener noreferrer">
          <img className={styles.characterImg} src={character['character']['images']['jpg']['image_url']} alt="" />
        </Link>
      </div>
      <div className={styles.characterInfo}>
        <h3>{character['character']['name']}</h3>
        <div className={styles.voiceActor}>{character['voice_actors'].map(voiceActor => voiceActor['language'] === 'Japanese' ? voiceActor['person']['name'] : null)}</div>
        <div className={styles.characterType}>{character['role']}</div>
      </div>
    </div>
  )
}
