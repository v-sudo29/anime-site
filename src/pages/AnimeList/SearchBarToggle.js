import React from 'react'
import Search from '../../components/Search'
import SearchBtn from '../../components/SearchBtn'
import CarrotDown from '../../icons/CarrotDown'

export default function SearchBarAndToggle({
  styles,
  inputValue,
  handleEnter,
  resetPageCount,
  handleGenresSearch,
  toggleGenres
}) {
  return (
    <div className={styles.searchAndBtnContainer}>
      <Search
        placeholder={'Search for anime'}
        inputValue={inputValue}
        handleEnter={handleEnter}
      />
      <SearchBtn 
        styles={styles}
        resetPageCount={resetPageCount}
        handleGenresSearch={handleGenresSearch}
      />
      {/* GENRES MENU TOGGLE*/}
      <button onClick={(e) => toggleGenres(e)} className={styles.genresBtn} type="button">
        Genres
        <div className={styles.carrotContainer}>
          <CarrotDown />
        </div>
      </button>
    </div>
  )
}
