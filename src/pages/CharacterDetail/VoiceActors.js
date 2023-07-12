import React, { useState, useEffect } from 'react'
import VoiceActorCard from './VoiceActorCard'

export default function VoiceActors({styles, character}) {
  const [vaInfo, setVaInfo] = useState(null)
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
    <div className={styles.voiceActorsContainer}>
      <h2 className={styles.sectionTitle}>Voice Actors</h2>
      <div className={styles.vaCardsContainer}>
        {vaCards ? vaCards : <p>No voice actors.</p>}
      </div>
    </div>
  )
}
