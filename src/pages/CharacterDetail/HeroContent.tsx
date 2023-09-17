import React from 'react'

export default function HeroContent({styles, character}) {
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
