import React from 'react'
import SearchBar from '../../components/SearchBar'
import CarrotDown from '../../icons/CarrotDown'
import styles from '../../styles/anime-list/SearchAndGenres.module.css'
import carrotStyles from '../../styles/icons/CarrotDown.module.css'

const { carrotActive } = carrotStyles

export default function SearchAndGenres({
  genresMasterList,
  genresShown,
  setGenresShown,
  setGenresSelected,
  inputValue,
  handleGenresSearch,
}) {
  function animateCarrot() {
    const svgElement = document.querySelector(`.${styles.carrotContainer} svg`)

    if (!svgElement.classList.contains(carrotActive)) {
      svgElement.classList.add(carrotActive)
    } else {
      svgElement.classList.remove(carrotActive)
    }
  }

  function toggleGenres(e) {
    e.stopPropagation()
    setGenresShown(!genresShown)
    animateCarrot()
  }

  function handleEnter(e) {
    e.key === 'Enter' && handleGenresSearch()
  }

  function handleGenreTagClick(e) {
    const genreName = e.target.innerHTML

    // Style genre tag
    !e.target.classList.contains(`${styles.active}`) ? e.target.classList.add(`${styles.active}`) : 
      e.target.classList.remove(`${styles.active}`)

    // Add or remove genre from state array
    setGenresSelected(prevGenres => {
      const genreExists = prevGenres.find(genre => genre === genreName)
      const newArr = [...prevGenres]
      if (genreExists) {
        newArr.pop(genreName)
        return newArr
      } else {
        newArr.push(genreName)
        return newArr
      }
    })
  }

  return (
  <div className={styles.container}>
      <div className={styles.searchAndBtnContainer}>
        <SearchBar
          placeholder={'Search for anime'}
          inputValue={inputValue}
          handleEnter={handleEnter}
        />
        <div className={styles.searchBtnContainer}>
          <button 
            className={styles.searchBtn}
            type="button"
            onClick={handleGenresSearch}
            >Search
          </button>
        </div>
        <button onClick={(e) => toggleGenres(e)} className={styles.genresBtn} type="button">
          Genres
          <div className={styles.carrotContainer}>
            <CarrotDown />
          </div>
        </button>
      </div>
      {genresShown ?
      <div className={styles.genreTagsContainer}>
        {genresMasterList.current.map(genre => {
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
      : null}
    </div>
  )
}
