import React, { useState, useEffect } from 'react'
import styles from '../../styles/character-detail/VoiceActors.module.css'
import VoiceActorCard from './VoiceActorCard'
import { CharacterDetailData, Voice } from '../../types/fetchDataTypes/fetchCharacterDetailTypes'

interface IVoiceActors {
  character: CharacterDetailData
}

export default function VoiceActors({ character }: IVoiceActors) {
  const [vaInfo, setVaInfo] = useState<Voice[] | null>(null)
  let vaCards = null

  useEffect(() => {
    if (character) setVaInfo(character['voices'])
  }, [character])

  if (vaInfo) vaCards = vaInfo.map(actor => 
    <VoiceActorCard
      key={actor['person']['name']}
      styles={styles}
      actor={actor}
    />
  )

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Voice Actors</h2>
      <div className={styles.cardsContainer}>
        {vaCards ? vaCards : <p>No voice actors.</p>}
      </div>
    </div>
  )
}
