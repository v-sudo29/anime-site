import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from '../styles/components/Header.module.css'

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink className={({isActive}) => isActive ? 'active-link' : null} to='/'>Home</NavLink>
        <NavLink className={({isActive}) => isActive ? 'active-link' : null} to='/anime-list'>Anime</NavLink>
        <NavLink className={({isActive}) => isActive ? 'active-link' : null} to='/news'>News</NavLink>
      </nav>
    </header>
  )
}

export default Header