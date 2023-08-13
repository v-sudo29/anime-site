import React from 'react'

export default function GenresMenu({
  genresContainerRef,
  styles,
  genresMasterList,
  handleGenreTagClick
}) {
  return (
    <div ref={genresContainerRef} className={styles.genreTagsContainer}>
      {genresMasterList.map(genre => {
        return (
          <button 
            key={genre['mal_id']} 
            className={styles.genreTag}
            type="button"
            onClick={(e) => handleGenreTagClick(e)}
          >{genre.name}
          </button>
        )
      })}
    </div>
  )
}
