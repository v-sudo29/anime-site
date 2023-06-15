import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className='header'>
      <nav className='nav-links'>
        <NavLink className={({isActive}) => isActive ? 'active-link' : null} to='/'>Home</NavLink>
        <NavLink className={({isActive}) => isActive ? 'active-link' : null} to='/anime-list'>Anime List</NavLink>
        <NavLink className={({isActive}) => isActive ? 'active-link' : null} to='/news'>News</NavLink>
      </nav>
    </header>
  )
}

export default Header