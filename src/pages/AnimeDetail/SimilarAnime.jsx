import React from 'react'
import useFetchSimilar from '../../hooks/useFetchSimilar'
import SimilarCard from './SimilarCard'
import styles from '../../styles/anime-detail/SimilarAnime.module.css'

export default function SimilarAnime({ id }) {
  const { similarData } = useFetchSimilar(id)
  let similarCards = []

  if (similarData && similarData.length > 0) similarCards = similarData.map((anime, index) => 
    (index < 4) &&
      <SimilarCard
        key={`${id}-${anime['entry']['title']}`}
        styles={styles}
        anime={anime}
      />
  )

  return (
    <div className={styles.similarContainer}>
      <h2 className={styles.sectionTitle}>Similar Anime</h2>
      {similarCards.length > 0 ? 
        <div className={styles.similarCardsContainer}>
          {similarCards}
        </div>
      : <p className={styles.defaultText}>No similar anime at this time</p> }
    </div>
  )
}
