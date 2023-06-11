import React from 'react'
import SearchIcon from '../icons/SearchIcon'

export default function SearchBar() {
  return (
    <div className='home-search-bar-container'>
      <div className='search-icon-container'>
        <SearchIcon />
      </div>
      <input className='home-search-bar' type="text" placeholder='Search for anime, characters, news...'/> 
    </div>
  )
}
