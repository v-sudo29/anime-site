import { createContext, useContext } from "react";
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

  return (
    <DefaultDataContext.Provider value={valueObject}>
      {children}
    </DefaultDataContext.Provider>
  )
}