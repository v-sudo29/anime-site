import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from '../styles/components/Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <NavLink className={({isActive}) => isActive ? styles.activeLink : styles.notActiveLink} to='/'>Home</NavLink>
        <NavLink className={({isActive}) => isActive ? styles.activeLink : styles.notActiveLink} to='/anime'>Anime</NavLink>
        <NavLink className={({isActive}) => isActive ? styles.activeLink : styles.notActiveLink} to='/news'>News</NavLink>
      </nav>
    </header>
  )
}

export default Header