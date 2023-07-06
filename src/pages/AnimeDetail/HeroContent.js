import React from 'react'

export default function HeroContent({styles, anime}) {
  return (
    <div className={styles.heroContent}>
      <div className={styles.heroContainer}>
        <div className={styles.imgContainer}>
          <img className={styles.animeImg} src={`${anime.images.jpg['large_image_url']}`} alt="" />
          <div className={styles.animeScore}>{anime.score ? anime['score'].toString().length > 3 ? anime['score'].toString().substring(0, 3) : anime['score'] : '-'}</div>
        </div>
        <div className={styles.titleAndRank}>
          <h1 className={styles.title}>{anime.title}</h1>
          <div className={styles.rank} >#{anime.rank < 10 ? '0' + anime.rank : anime.rank}</div>
        </div>
      </div>
    </div>
  )
}
