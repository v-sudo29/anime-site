import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface IMobileContext {
  isMobile: boolean
  isTablet: boolean
}

const MobileContext = createContext<IMobileContext>({} as IMobileContext)

export const useMobile = () => {
  return useContext(MobileContext)
}

const MobileProvider = ({ children } : { children: ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  const handleResize = () => {
    console.log(window.innerWidth)
    if (window.innerWidth >= 300 && window.innerWidth <= 480) {
      setIsMobile(true)
      setIsTablet(false)
      return
    }
    if (window.innerWidth >= 481 && window.innerWidth <= 600) {
      setIsTablet(true)
      setIsMobile(false)
      return
    }
    if (window.innerWidth > 600) {
      setIsMobile(false)
      setIsTablet(false)
    }
  }
  // Handle window resizing for media queries
  useEffect(() => {
    if (window.innerWidth >= 320 && window.innerWidth <= 479) setIsMobile(true)
    if (window.innerWidth >= 480 && window.innerWidth <= 600) setIsTablet(true)
    else {
      setIsMobile(false)
      setIsTablet(false)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const valueObject = {
    isMobile, isTablet
  }

  return (
    <MobileContext.Provider value={valueObject}>
      {children}
    </MobileContext.Provider>
  )
}

export default MobileProvider