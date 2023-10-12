import React from 'react'
import SearchIcon from '../icons/SearchIcon'
import styles from '../styles/components/SearchBar.module.css'

interface SearchProps {
  placeholder: string
  inputValue: React.RefObject<HTMLInputElement>
  handleEnter: (e: React.KeyboardEvent<HTMLInputElement>) => false | void
}

export default function Search({ placeholder, inputValue, handleEnter } : SearchProps) {
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
        onKeyDown={handleEnter ? (e) => handleEnter(e) : undefined}
      />
    </div>
  )
}
