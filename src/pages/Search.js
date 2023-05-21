import React, { useState, useRef, useEffect } from 'react'

function Search() {
  const [genresMasterList, setGenresMasterList] = useState(
    [
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
  const [genres, setGenres] = useState([])
  const [searchData, setSearchData] = useState([])
  const inputDOM = useRef(null)

  // Handles submit for search query
  function onSubmit() {

    // Check for empty string
    if (/^\s*$/.test(inputDOM.current.value)) {

    } else {
      getSearchData()
    }
  }

  // Handles genre clicks, store in genres state
  function handleClick(e) {
    const genreName = e.target.innerHTML
    const genreExists = genres.some(genre => genre.name === genreName)

    if (genreExists) {
      e.target.classList.remove('genre-active')
      setGenres(prevGenres => {
        return prevGenres.filter(genre => genre.name !== genreName ? genre : null)
      })
    } else {
      e.target.classList.add('genre-active')
      setGenres(prevGenres => {
        const foundGenre = genresMasterList.find(genre => genre.name === genreName)
        return [...prevGenres, foundGenre]
      })
    }
  }

  async function getSearchData() {
    const genresIdArray = genres.map(genre => genre['mal_id'])
    const genresIdString = genresIdArray.toString()

    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${inputDOM.current.value}&genres=${genresIdString}`)
      const data = await response.json()
      await setSearchData(data.data)
      
    }

    catch (error) {
      console.error(error)
    }
  }

  // Fetch API results based on genres user selects
  useEffect(() => {
    getSearchData()
  }, [genres])

  const allGenreTags = genresMasterList.map(genre => {
    return (
      <span 
        key={genre.name}
        id={genre['mal_id']}
        onClick={(e) => handleClick(e)} 
        className='genre-tag'
        >{genre.name}
      </span>
    )
  })

  const searchResults = searchData.map(genre => {
    return (
      <div key={genre['mal_id']} className='search-result-card'>
        <h3 className='search-result-title'>{genre['title_english'] === null ? genre['title'] : genre['title_english']}</h3>
        <div className='search-image-container'>
          <img className='search-img' src={`${genre['images']['jpg']['large_image_url']}`} alt="" />
        </div>
        <div>Genres: {genre.genres.map(g => g.name + ' ')}</div>
      </div>
    )
  })

  return (
    <div className='search-page-container'>
      <h1>Search</h1>
      <div className='search-input-button-container'>
        <input ref={inputDOM} type='text' />
        <button onClick={onSubmit} type='submit'>Search</button>
      </div>
      <div className='genre-container'>
        {allGenreTags}
      </div>
      <div className='search-results-container'>
        {searchResults}
      </div>
    </div>
  )
}

export default Search