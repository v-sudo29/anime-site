import React, { useState, useEffect, useRef } from 'react'
import LoaderAnimation from '../../components/LoaderAnimation'
import SearchBar from '../../components/SearchBar'
import LatestNews from './LatestNews'
import TrendingCarousel from './TrendingCarousel'
import Upcoming from './Upcoming'
import MostPopular from './MostPopular'
import NewsCard from './NewsCard'
import useFetchNews from '../../hooks/useFetchNews'
import useFetchTrending from '../../hooks/useFetchTrending'
import useFetchUpcoming from '../../hooks/useFetchUpcoming'
import useFetchPopular from '../../hooks/useFetchPopular'
import styles from '../../styles/home/Home.module.css'

function Home() {
  const [newsCards, setNewsCards] = useState(null)
  const inputValue = useRef(null)
  const { newsData, newsError, newsLoading } = useFetchNews()
  const { trendingData, trendingError, trendingLoading } = useFetchTrending()
  const { upcomingData, upcomingError, upcomingLoading } = useFetchUpcoming()
  const { popularData, popularError, popularLoading } = useFetchPopular()

  // Set newsCards from newsData
  useEffect(() => {
    if (newsData) {
      setNewsCards(newsData.map(news => {
        if (news.image === 'doesn\'t exist!') {
          return null
        }
        return (
          <NewsCard
            key={news.title}
            news={news}
          />
        )
      }))
    }
  }, [newsData])

  if (newsLoading || trendingLoading || upcomingLoading || popularLoading) return <LoaderAnimation/>

  if (trendingError || upcomingError || popularError || newsError) return <h1>Error: Please refresh and try again</h1>

  if (newsCards && trendingData && upcomingData) return (
    <div className={styles.container}>
      {(trendingError || upcomingError || popularError || newsError) && <h1>Error: Please refresh and try again</h1>}
      {(newsCards && trendingData) && 
        <>
          <div className={styles.heroImage}></div>
          <div className={styles.content}>

            <SearchBar 
              placeholder={'Search for anime, characters, news...'}
              inputValue={inputValue}
              // TODO: create handleEnter function
            />
            <LatestNews
              newsData={newsData}
              newsCards={newsCards}
            />
            <TrendingCarousel
              trendingData={trendingData}
            />
            <Upcoming 
              upcomingData={upcomingData}
            />
            <MostPopular 
              popularData={popularData}
            />
          </div>     
        </>
        }    

    </div>
  )
}

export default Home