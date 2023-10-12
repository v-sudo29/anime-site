import React from 'react'
import Search from '../../components/Search'
import CarrotDownIcon from '../../icons/CarrotDownIcon'
import { useMobile } from '../../context/mobileContext'

interface SearchBarAndToggleProps {
  styles: CSSModuleClasses
  inputValue: React.RefObject<HTMLInputElement>
  handleEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void
  toggleGenres: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  genresShown: boolean
}

const SearchBarAndToggle = ({
  styles,
  inputValue,
  handleEnter,
  toggleGenres,
  genresShown
}: SearchBarAndToggleProps) => {
  const { isMobile } = useMobile()

  return (
    <div className={styles.searchAndBtnContainer}>
      <Search
        placeholder={'Search for anime'}
        inputValue={inputValue}
        handleEnter={handleEnter}
      />
      {/* GENRES MENU TOGGLE BUTTON*/}
      <button
        onClick={(e) => toggleGenres(e)}
        className={genresShown ? styles.activeGenresBtn : styles.genresBtn}
        type="button"
      >
        {!isMobile && 'Genres'}
        <div className={styles.carrotContainer}>
          <CarrotDownIcon />
        </div>
      </button>
    </div>
  )
}

export default SearchBarAndToggle