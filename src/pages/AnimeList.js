import React, { useState, useEffect, useRef } from 'react'
import SearchIcon from '../icons/SearchIcon'
import CarrotDown from '../icons/CarrotDown'
import Card from '../components/Card'
import filterTitle from '../helpers/filterTitle'

function AnimeList() {

  return (
    <div className='animeList-page-container'>
      <div className='animeList-hero-image-container'></div>
      <div className='animeList-search-and-genres-container'>
        <div className='search-bar-container'>
          <div className='animeList-search-icon-container'>
            <SearchIcon className='animeList-search-icon' />
          </div>
          <input className='search-bar' type="text" placeholder='Search for anime'/>
        </div>
        <button className='genres-btn' type="button">
          Genres
          <CarrotDown />
        </button>
      </div>

      <div className='animeList-container'>
        
      </div>
    </div>
  )
}

export default AnimeList