import React from 'react'
import Search from '../../components/Search'
import SearchBtn from '../../components/SearchBtn'
import CarrotDown from '../../icons/CarrotDown'
import { useMobile } from '../../context/mobileContext'

interface ISearchBarAndToggle {
  styles: CSSModuleClasses
  inputValue: React.RefObject<HTMLInputElement>
  handleEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void
  resetPageCount: () => void
  handleGenresSearch: () => void
  toggleGenres: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function SearchBarAndToggle({
  styles,
  inputValue,
  handleEnter,
  resetPageCount,
  handleGenresSearch,
  toggleGenres
}: ISearchBarAndToggle) {
  const { isMobile } = useMobile()

  return (
    <div className={styles.searchAndBtnContainer}>
      <Search
        placeholder={'Search for anime'}
        inputValue={inputValue}
        handleEnter={handleEnter}
      />
      {!isMobile && (
        <SearchBtn 
          styles={styles}
          resetPageCount={resetPageCount}
          handleGenresSearch={handleGenresSearch}
        />
      )}
      {/* GENRES MENU TOGGLE*/}
      <button onClick={(e) => toggleGenres(e)} className={styles.genresBtn} type="button">
        {!isMobile && 'Genres'}
        <div className={styles.carrotContainer}>
          <CarrotDown />
        </div>
      </button>
    </div>
  )
}
