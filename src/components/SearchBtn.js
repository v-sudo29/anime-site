import React from 'react'

export default function SearchBtn({styles, resetPageCount, handleGenresSearch}) {
  return (
    <div className={styles.searchBtnContainer}>
      <button 
        className={styles.searchBtn}
        type="button"
        onClick={() => {
            resetPageCount()
            handleGenresSearch()
          }
        }
        >Search
      </button>
    </div>
  )
}
