import React from 'react'

interface SearchBtnProps {
  styles: CSSModuleClasses
  resetPageCount: () => void
  handleGenresSearch: () => void
}

export default function SearchBtn({ styles, resetPageCount, handleGenresSearch } : SearchBtnProps) {
  return (
    <div className={styles.searchBtnContainer}>
      <button 
        className={styles.searchBtn}
        type="button"
        onClick={() => {
          resetPageCount()
          handleGenresSearch()
        }}
        >Search
      </button>
    </div>
  )
}
