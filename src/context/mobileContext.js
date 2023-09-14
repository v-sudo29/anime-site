import { createContext, useContext, useEffect, useState } from 'react'

const MobileContext = createContext({})

export const useMobile = () => {
  return useContext(MobileContext)
}

const MobileProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false)

  const handleResize = () => {
    if (window.innerWidth > 480) setIsMobile(false)
    else setIsMobile(true)
  }

  // Handle window resizing for media queries
  useEffect(() => {
    if (window.innerWidth > 480) setIsMobile(false)
    else setIsMobile(true)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const valueObject = {
    isMobile
  }

  return (
    <MobileContext.Provider value={valueObject}>
      {children}
    </MobileContext.Provider>
  )
}

export default MobileProvider