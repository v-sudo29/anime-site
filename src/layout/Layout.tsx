import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import ScrollToTop from '../components/ScrollToTop'

function Layout() {
  return (
    <ScrollToTop>
      <Header />
      <Outlet />
    </ScrollToTop>
  )
}

export default Layout
