import React from 'react'
import SearchIcon from '../icons/SearchIcon'

export default function SearchBar({placeholder, inputValue, handleEnter}) {
  return (
    <div className='search-bar-container'>
      <div className='search-icon-container'>
        <SearchIcon/>
      </div>
      <input 
        className='search-bar' 
        type="text" 
        placeholder={placeholder ? placeholder : 'Search for anime'}
        ref={inputValue ? inputValue : null} 
        onKeyDown={handleEnter ? (e) => handleEnter(e) : null}
      />
    </div>
  )
}
