import React from 'react'
import styles from '../../styles/anime-list/SearchAndGenres.module.css'
import carrotStyles from '../../styles/icons/CarrotDown.module.css'
import { genresMasterList } from './genresMasterList'
import genresToIds from '../../helpers/genresToIds'
import SearchBarAndToggle from './SearchBarToggle'
import GenresMenu from './GenresMenu'

interface ISearchAndGenres {
  genresShown: boolean
  setGenresShown: React.Dispatch<React.SetStateAction<boolean>>
  inputValue: React.RefObject<HTMLInputElement>
  resetPageCount: () => void
  setResultsType: React.Dispatch<React.SetStateAction<string>>
  fetchNewData: (url: string) => Promise<void>
  fetchDefaultPopular: () => Promise<void>
}

export default function SearchAndGenres({
  genresShown,
  setGenresShown,
  inputValue,
  resetPageCount,
  setResultsType,
  fetchNewData,
  fetchDefaultPopular
}: ISearchAndGenres) {
  const animateCarrot = (): void => {
    const { carrotActive } = carrotStyles
    const svgElement = document.querySelector(`.${styles.carrotContainer} svg`) as SVGAElement

    !svgElement.classList.contains(carrotActive) ? svgElement.classList.add(carrotActive, `${styles.carrotActiveColorChange}`) :
      svgElement.classList.remove(carrotActive, `${styles.carrotActiveColorChange}`)
  }

  const toggleGenres = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.stopPropagation()
    setGenresShown(!genresShown)
    animateCarrot()
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') handleGenresSearch()
  }

  const handleGenresSearch = (): void => {
    setResultsType('search bar')

    // Get search parameter as string
    const searchParameter = inputValue.current?.value ? inputValue.current.value : ''

    // Get selected genres into an array
    const genresContainerExists = document.querySelector('.genreTagsContainer')

    // const genreContainerExists = genresContainerRef.current ? true : false
    const buttonElementsArr = genresContainerExists ? [...genresContainerExists.children]
      : []
    const selectedGenres = [] as string[]

    buttonElementsArr.forEach(button => {
      const buttonElement = button as HTMLButtonElement
      const list = button.classList
      if (list.value.includes('active')) selectedGenres.push(buttonElement.innerText)
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

  const handleGenreTagClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const genreBtnElement = e.target as HTMLButtonElement

    // Style genre tag if active/inactive
    genreBtnElement.classList.contains(`${styles.active}`) ? genreBtnElement.classList.remove(`${styles.active}`) :
      genreBtnElement.classList.add(`${styles.active}`)
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
        genresShown={genresShown}
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
