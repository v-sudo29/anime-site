import { createContext, useContext, useEffect } from "react";
import useFetchTrending from "../hooks/useFetchTrending";
import useFetchUpcoming from "../hooks/useFetchUpcoming";
import useFetchPopular from "../hooks/useFetchPopular";
import useFetchNews from "../hooks/useFetchNews";

const DefaultDataContext = createContext({})

export const useDefaultData = () => {
  return useContext(DefaultDataContext)
}

export const DefaultDataProvider = ({ children }) => {
  const { trendingData, trendingError, trendingLoading } = useFetchTrending()
  const { upcomingData, upcomingError, upcomingLoading } = useFetchUpcoming()
  const { popularData, popularError, popularLoading } = useFetchPopular()
  const { newsData, newsError, newsLoading } = useFetchNews()

  const valueObject = {
    trendingData,
    upcomingData,
    popularData,
    newsData,
    trendingError,
    upcomingError,
    popularError,
    newsError,
    trendingLoading,
    upcomingLoading,
    popularLoading,
    newsLoading
  }

  // Check localStorage if there is already saved data, if not then set localStorage
  useEffect(() => {
    const localDataExists = localStorage.getItem('defaultData') 
    if (!localDataExists && trendingData && upcomingData && popularData && newsData) {
      localStorage.setItem('defaultData', JSON.stringify({
        trendingData,
        upcomingData,
        popularData,
        newsData
      }))
    }
    return () => localStorage.clear('defaultData')
  }, [trendingData, upcomingData, popularData, newsData])

  return (
    <DefaultDataContext.Provider value={valueObject}>
      {children}
    </DefaultDataContext.Provider>
  )
}