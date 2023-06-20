import React, { useState, useRef } from 'react'
import SearchBar from '../../components/SearchBar'
import CarrotDown from '../../icons/CarrotDown'
import styles from '../../styles/anime-list/SearchAndGenres.module.css'
import carrotStyles from '../../styles/icons/CarrotDown.module.css'

const { carrotActive } = carrotStyles

export default function SearchAndGenres({fetchData}) {
  const [genresShown, setGenresShown]= useState(false)
  const [genresSelected, setGenresSelected] = useState([])
  const inputValue = useRef(null)
  const genresMasterList = useRef([
    {name: 'Action', mal_id: 1},
    {name: 'Adventure', mal_id: 2},
    {name: 'Boys Love', mal_id: 28},
    {name: 'Comedy', mal_id: 4},
    {name: 'Drama', mal_id: 8},
    {name: 'Fantasy', mal_id: 10},
    {name: 'Girls Love', mal_id: 26},
    {name: 'Horror', mal_id: 14},
    {name: 'Mystery', mal_id: 7},
    {name: 'Romance', mal_id: 22},
    {name: 'Sci-Fi', mal_id: 24},
    {name: 'Slice of Life', mal_id: 36},
    {name: 'Sports', mal_id: 30},
    {name: 'Supernatural', mal_id: 37},
    {name: 'Suspense', mal_id: 41},
  ])
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
    e.key === 'Enter' && handleSearch()
  }

  function handleSearch() {
    const searchParameter = inputValue.current.value

    // Convert genres to mal_id's
    const idsArr = genresSelected.map(genre => {
      let malId = null
      genresMasterList.current.forEach(obj => obj.name === genre ? malId = obj['mal_id'] : null)
      return malId
    })

    const stringifiedGenres = genresSelected.length > 0 ? idsArr.join(',') : ''
    const searchUrl = `https://api.jikan.moe/v4/anime?type=tv&genres=${stringifiedGenres}&q=${searchParameter}`

    fetchData(searchUrl)
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
            onClick={handleSearch}
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
