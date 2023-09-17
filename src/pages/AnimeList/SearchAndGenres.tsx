import React from 'react'
import styles from '../../styles/anime-list/SearchAndGenres.module.css'
import carrotStyles from '../../styles/icons/CarrotDown.module.css'
import { genresMasterList } from './genresMasterList'
import genresToIds from '../../helpers/genresToIds'
import SearchBarAndToggle from './SearchBarToggle'
import GenresMenu from './GenresMenu'

export default function SearchAndGenres({
  genresShown,
  setGenresShown,
  inputValue,
  resetPageCount,
  setResultsType,
  fetchNewData,
  fetchDefaultPopular
}) {
  const animateCarrot = () => {
    const { carrotActive } = carrotStyles
    const svgElement = document.querySelector(`.${styles.carrotContainer} svg`)

    !svgElement.classList.contains(carrotActive) ? svgElement.classList.add(carrotActive) :
      svgElement.classList.remove(carrotActive)
  }

  const toggleGenres = (e) => {
    e.stopPropagation()
    setGenresShown(!genresShown)
    animateCarrot()
  }

  const handleEnter = (e) => e.key === 'Enter' && handleGenresSearch()

  const handleGenresSearch = () => {
    setResultsType('search bar')
    // Get search parameter as string
    const searchParameter = inputValue.current.value ? inputValue.current.value : ''

    // Get selected genres into an array
    const genresContainerExists = document.querySelector('.genreTagsContainer')

    // const genreContainerExists = genresContainerRef.current ? true : false
    const buttonElementsArr = genresContainerExists ? [...genresContainerExists.children]
      : []
    const selectedGenres = []

    buttonElementsArr.forEach(button => {
      const list = button.classList
      if (list.value.includes('active')) selectedGenres.push(button.innerText)
    })

    // Convert genres to mal_id's
    const idsArr = genresToIds(selectedGenres)
    const stringifiedGenres = selectedGenres.length > 0 ? idsArr.join(',') : ''
    // console.log({ idsArr, stringifiedGenres })
    if (searchParameter === '' && stringifiedGenres === '') fetchDefaultPopular()
    else {
      const searchUrl = `https://api.jikan.moe/v4/anime?type=tv&genres=${stringifiedGenres}&q=${searchParameter}&page=1`
      fetchNewData(searchUrl)
    }
  }

  const handleGenreTagClick = (e) => {
    const genreBtnElement = e.target

    // Style genre tag if active/inactive
    !genreBtnElement.classList.contains(`${styles.active}`) ? genreBtnElement.classList.add(`${styles.active}`) : 
      genreBtnElement.classList.remove(`${styles.active}`)
  }

  return (
  <div className={styles.container}>
      <SearchBarAndToggle
        styles={styles}
        inputValue={inputValue}
        handleEnter={handleEnter}
        resetPageCount={resetPageCount}
        handleGenresSearch={handleGenresSearch}
        toggleGenres={toggleGenres}
      />
      {genresShown && (
        <GenresMenu
          styles={styles}
          genresMasterList={genresMasterList}
          handleGenreTagClick={handleGenreTagClick}
        />
      )}
    </div>
  )
}
