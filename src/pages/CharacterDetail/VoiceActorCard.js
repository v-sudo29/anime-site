import React from 'react'

export default function VoiceActorCard({styles, actor}) {
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
}
