import React from 'react'

interface IGenresMenu {
  styles: CSSModuleClasses
  genresMasterList: {
    name: string;
    mal_id: number;
  }[]
  handleGenreTagClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
export default function GenresMenu({
  styles,
  genresMasterList,
  handleGenreTagClick,
}: IGenresMenu) {
  return (
    <div className={`${styles.genreTagsContainer} genreTagsContainer`}>
      {genresMasterList.map(genre => {
        return (
          <button 
            key={genre['mal_id']} 
            className={styles.genreTag}
            type="button"
            onClick={(e) => handleGenreTagClick(e)}
          >
            {genre.name}
          </button>
        )
      })}
    </div>
  )
}
