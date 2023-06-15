import React, { useState, useRef } from 'react'
import SearchIcon from '../../icons/SearchIcon'
import CarrotDown from '../../icons/CarrotDown'

export default function SearchAndGenres({animateCarrot, fetchData}) {
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
    !e.target.classList.contains('genre-active') ? e.target.classList.add('genre-active') : 
      e.target.classList.remove('genre-active')

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
  <div className='animeList-search-and-genres-container'>
      <div className='search-bar-and-button-container'>
        <div className='search-bar-container'>
          <div className='animeList-search-icon-container'>
            <SearchIcon className='animeList-search-icon' />
          </div>
          <input 
            className='search-bar' 
            type="text" 
            placeholder='Search for anime'
            ref={inputValue} 
            onKeyDown={(e) => handleEnter(e)}
          />
        </div>
        <div className='animeList-search-button-container'>
          <button 
            className='animeList-search-button'
            type="button"
            onClick={handleSearch}
            >Search
          </button>
        </div>
        <button onClick={(e) => toggleGenres(e)} className='genres-btn' type="button">
          Genres
          <div className='genres-carrot-container'>
            <CarrotDown />
          </div>
        </button>
      </div>
      {genresShown ?
      <div className='genre-tags-container'>
        {genresMasterList.current.map(genre => {
          return (
            <button 
              key={genre['mal_id']} 
              className='genre-tag' 
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
