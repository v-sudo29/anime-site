import React from 'react'

export default function RelatedCard({styles, anime}) {
  return (
    <div key={anime.name} className={styles.mainCard}>
      <a className={styles.anchorContainer} href={`/anime/${anime.id}`}>
        <img className={styles.mainImg} src={anime.image} alt={anime.name} />
      </a>
      <div className={styles.mainType}>{anime.type}</div>
      <a href={`/anime/${anime.id}`}>
        <div className={styles.mainName}>{anime.name}</div>
      </a>
    </div>
  )
}
