import React, { useState, useEffect } from 'react'

export default function SimilarAnime({styles, id}) {
  const [similarData, setSimilarData] = useState(null)
  const [similarCards, setSimilarCards] = useState(null)

  // Fetch recommendations data
  useEffect(() => {
    setTimeout(() => {
      fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`)
      .then(res => res.json())
      .then(data => setSimilarData(data.data))
    }, 3000)
  }, [id])

  useEffect(() => {
    if (similarData && similarData.length > 0) {
      setSimilarCards(similarData.map((anime, index) => {
        if (index < 4) {
          return (
            <div key={anime['entry']['title']} className={styles.similarCard}>
              <a href={`/anime/${anime['entry']['mal_id']}`} target='_blank' rel="noreferrer">
                <img className={styles.similarImg} src={anime['entry']['images']['jpg']['large_image_url']} alt=""/>
              </a>
              <div className={styles.similarName}>{anime['entry']['title']}</div>
            </div>
          )
        } return null
      }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [similarData])

  return (
    <div className={styles.similarContainer}>
      <h2>Similar Anime</h2>
      <div className={styles.similarCardsContainer}>
        {similarCards ? similarCards : 'No similar anime at this time.'}
      </div>
    </div>
  )
}
