import React from 'react'
import LoaderAnimation from '../../components/LoaderAnimation'
import LatestNews from './LatestNews'
import TrendingCarousel from './TrendingCarousel'
import Upcoming from './Upcoming'
import MostPopular from './MostPopular'
import NewsCard from './NewsCard'
import FetchError from '../../components/FetchError'
import styles from '../../styles/home/Home.module.css'
import { useDefaultData } from '../../context/defaultDataContext'
import { useMobile } from '../../context/mobileContext'

function Home() {
  const {
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
  } = useDefaultData()

  const { isMobile } = useMobile()
  let newsCards = null

  if (newsData) newsCards = newsData.news.map((news, index) => {
    if (isMobile && index < 3) {
      return (
        <NewsCard
          key={news.title}
          news={news}
        />
      )
    }
    if (!isMobile && index < 5) {
      return (
        <NewsCard
          key={news.title}
          news={news}
        />
      )
    }
    return null  
  })

  document.title = 'YourAnimeList: Home'

  if (newsLoading || trendingLoading || upcomingLoading || popularLoading) return <LoaderAnimation/>
  if (trendingError || upcomingError || popularError || newsError) return <FetchError/>
  if (newsCards && trendingData && upcomingData && popularData) return (
    <div className={styles.container}>
      {(newsCards && trendingData) && 
        <>
          <div className={styles.content}>
            <LatestNews newsCards={newsCards}/>
            <TrendingCarousel trendingData={trendingData}/>
            <Upcoming upcomingData={upcomingData}/>
            <MostPopular popularData={popularData}/>
          </div>     
        </>
        }    
    </div>
  )
}

export default Home