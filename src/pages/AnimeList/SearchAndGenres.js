import React from 'react'
import SearchBar from '../../components/SearchBar'
import CarrotDown from '../../icons/CarrotDown'
import styles from '../../styles/anime-list/SearchAndGenres.module.css'
import carrotStyles from '../../styles/icons/CarrotDown.module.css'
import { genresMasterList } from './genresMasterList'
import genresToIds from '../../helpers/genresToIds'
import SearchBtn from '../../components/SearchBtn'

export default function SearchAndGenres({
  genresShown,
  setGenresShown,
  setGenresSelected,
  inputValue,
  resetPageCount,
  setResultsType,
  genresSelected,
  fetchData
}) {
  const { carrotActive } = carrotStyles

  function animateCarrot() {
    const svgElement = document.querySelector(`.${styles.carrotContainer} svg`)

    !svgElement.classList.contains(carrotActive) ? svgElement.classList.add(carrotActive) :
      svgElement.classList.remove(carrotActive)
  }

  function toggleGenres(e) {
    e.stopPropagation()
    setGenresShown(!genresShown)
    animateCarrot()
  }

  function handleEnter(e) {
    e.key === 'Enter' && handleGenresSearch()
  }

  function handleGenresSearch() {
    setResultsType('search bar')
    const searchParameter = inputValue.current.value ? inputValue.current.value : ''

    // Convert genres to mal_id's
    const idsArr = genresToIds(genresSelected)
    const stringifiedGenres = genresSelected.length > 0 ? idsArr.join(',') : ''
    if (searchParameter === '' && stringifiedGenres === '') fetchData('https://api.jikan.moe/v4/top/anime?filter=bypopularity')
    else {
      const searchUrl = `https://api.jikan.moe/v4/anime?type=tv&genres=${stringifiedGenres}&q=${searchParameter}&page=1`
      fetchData(searchUrl)
    }
  }

  function handleGenreTagClick(e) {
    const genreName = e.target.innerHTML

    // Style genre tag if active/inactive
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
        <SearchBtn 
          styles={styles}
          resetPageCount={resetPageCount}
          handleGenresSearch={handleGenresSearch}
        />
        <button onClick={(e) => toggleGenres(e)} className={styles.genresBtn} type="button">
          Genres
          <div className={styles.carrotContainer}>
            <CarrotDown />
          </div>
        </button>
      </div>
      {genresShown ?
        <div className={styles.genreTagsContainer}>
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
      : null}
      
    </div>
  )
}
