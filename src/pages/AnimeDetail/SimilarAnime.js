import React, { useState, useEffect } from 'react'

export default function SimilarAnime({styles, id}) {
  const [similarData, setSimilarData] = useState(null)
  const [similarCards, setSimilarCards] = useState(null)

  // Fetch recommendations data
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const timer = setTimeout(() => {
      fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`, {
        signal: signal
      })
        .then(response => {
          if (response.ok) return response.json()
          throw response
        })
        .then(data => setSimilarData(data.data))
        .catch(() => {
          if (signal.aborted) {
            console.log('The user aborted the request')
          } else {
            console.error('The request failed')
          }
        })
    }, 2500)
    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [id])

  useEffect(() => {
    if (similarData && similarData.length > 0) {
      setSimilarCards(similarData.map((anime, index) => {
        if (index < 4) {
          return (
            <div key={anime['entry']['title']} className={styles.similarCard}>
              <a href={`/anime/${anime['entry']['mal_id']}`}>
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
      <h2 className={styles.sectionTitle}>Similar Anime</h2>
      {similarCards ? 
        <div className={styles.similarCardsContainer}>
          {similarCards}
        </div>
      : <p className={styles.defaultText}>No similar anime at this time</p> }
    </div>
  )
}
