import React from 'react'
import SearchIcon from '../icons/SearchIcon'
import styles from '../styles/components/SearchBar.module.css'

export default function Search({placeholder, inputValue, handleEnter}) {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <SearchIcon/>
      </div>
      <input 
        className={styles.searchBar} 
        type="text" 
        placeholder={ placeholder ?? 'Search for anime'}
        ref={inputValue} 
        onKeyDown={handleEnter ? (e) => handleEnter(e) : null}
      />
    </div>
  )
}
