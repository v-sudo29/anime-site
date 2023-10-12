import React from 'react'

interface GenresMenuProps {
  styles: CSSModuleClasses
  genresMasterList: {
    name: string;
    mal_id: number;
  }[]
  handleGenreTagClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const GenresMenu = ({ styles, genresMasterList, handleGenreTagClick}: GenresMenuProps) => {
  const genreTags = genresMasterList.map(genre => (
    <button 
      key={genre['mal_id']} 
      className={styles.genreTag}
      type="button"
      onClick={(e) => handleGenreTagClick(e)}
    >
      {genre.name}
    </button>
  ))

  return (
    <div className={`${styles.genreTagsContainer} genreTagsContainer`}>
      {genreTags}
    </div>
  )
}

export default GenresMenu