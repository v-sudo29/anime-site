import React from 'react'

export default function Summary({styles, anime}) {
  const genreTags = anime.genres.map(genre => {
    return (
      <span key={genre.name} className={styles.genreTag}>{genre.name}</span>
    )
  })
  
  return (
    <div className={styles.summaryContainer}>
      <h2 className={styles.sectionTitle}>Summary</h2>
      {anime.synopsis ? 
        <p className={styles.synopsis}>{anime.synopsis}</p>
      : <p className={styles.defaultText}>No summary at this time.</p> }
      <div className={styles.genreTagsContainer}>
        {genreTags}
      </div>
    </div>
  )
}
