import React, { createContext, useContext, useEffect, ReactNode } from "react";
import useFetchTrending from "../hooks/useFetchTrending";
import useFetchUpcoming from "../hooks/useFetchUpcoming";
import useFetchPopular from "../hooks/useFetchPopular";
import useFetchNews from "../hooks/useFetchJSONNews";
import { TrendingDatum } from "../types/fetchDataTypes/fetchTrendingTypes";
import { UpcomingDatum } from "../types/fetchDataTypes/fetchUpcomingTypes";
import { PopularResponse } from "../types/fetchDataTypes/fetchPopularTypes";
import { JSONNewsResponse } from "../types/fetchDataTypes/fetchNewsTypes";

interface IDefaultDataContext {
  trendingData: TrendingDatum[] | null
  upcomingData: UpcomingDatum[] | null
  popularData: PopularResponse | null
  newsData: JSONNewsResponse | null
  trendingError: boolean
  upcomingError: boolean
  popularError: boolean
  newsError: boolean
  trendingLoading: boolean
  upcomingLoading: boolean
  popularLoading: boolean
  newsLoading: boolean
}

const DefaultDataContext = createContext<IDefaultDataContext>({} as IDefaultDataContext)

export const useDefaultData = () => {
  return useContext(DefaultDataContext)
}

export const DefaultDataProvider = ({ children } : { children: ReactNode }) => {
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
    return () => localStorage.clear()
  }, [trendingData, upcomingData, popularData, newsData])

  return (
    <DefaultDataContext.Provider value={valueObject}>
      {children}
    </DefaultDataContext.Provider>
  )
}