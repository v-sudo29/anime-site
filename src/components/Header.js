import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header>
      <nav className='nav-links'>
      <NavLink className={({isActive}) => isActive ? 'active-link' : null} to='/'>Home</NavLink>
      <NavLink className={({isActive}) => isActive ? 'active-link' : null} to='/top-anime'>Top Anime</NavLink>
      <NavLink className={({isActive}) => isActive ? 'active-link' : null} to='/search'>Search</NavLink>
      </nav>
    </header>
  )
}

export default Header