import React, { useState, useEffect } from 'react'

export default function VoiceActors({styles, character}) {
  const [vaInfo, setVaInfo] = useState(null)
  const [vaCards, setVaCards] = useState(null)

  useEffect(() => {
    if (character) setVaInfo(character['voices'])
  }, [character])

  useEffect(() => {
    if (vaInfo) {
      setVaCards(vaInfo.map(actor => {
        return (
          <div key={actor['person']['name']} className={styles.vaCard}>
            <div className={styles.vaImgContainer}>
              <a href={actor['person']['url']} target="_blank" rel="noopener noreferrer">
                <img className={styles.vaImg} src={actor['person']['images']['jpg']['image_url']} alt="" />
              </a>
            </div>
            <div className={styles.vaLanguage}>{actor['language']}</div>
            <div className={styles.vaName}>{actor['person']['name']}</div>
          </div>
        )
      }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vaInfo])

  return (
    <div className={styles.voiceActorsContainer}>
      <h2 className={styles.sectionTitle}>Voice Actors</h2>
      <div className={styles.vaCardsContainer}>
        {vaCards && vaCards}
      </div>
    </div>
  )
}
