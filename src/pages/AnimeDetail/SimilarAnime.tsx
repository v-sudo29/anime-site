import React from 'react'
import useFetchSimilar from '../../hooks/useFetchSimilar'
import SimilarCard from './SimilarCard'
import styles from '../../styles/anime-detail/SimilarAnime.module.css'

const SimilarAnime = ({ id } : { id: string | undefined }) => {
  const { similarData } = useFetchSimilar(id)
  let similarCards: (JSX.Element | null)[] = []

  if (similarData && similarData.length > 0) {
    similarCards = similarData.map((anime, index) => {
      if (index < 4) {
        return (
          <SimilarCard
            key={`${id}-${anime['entry']['title']}`}
            styles={styles}
            anime={anime}
          />
        )
      } else return null
    })
  }

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

export default SimilarAnime