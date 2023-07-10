import React, { useState, useEffect } from 'react'
import LoaderAnimation from '../../components/LoaderAnimation'
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
  const { newsData, newsError, newsLoading } = useFetchNews()
  const { trendingData, trendingError, trendingLoading } = useFetchTrending()
  const { upcomingData, upcomingError, upcomingLoading } = useFetchUpcoming()
  const { popularData, popularError, popularLoading } = useFetchPopular()

  // Set newsCards from newsData
  useEffect(() => {
    if (newsData) {
      setNewsCards(newsData.map((news, index) => {
        if (news.image === 'doesn\'t exist!') {
          return null
        }
        if (index < 4) {
          return (
            <NewsCard
              key={news.title}
              news={news}
            />
          )
        }
      }))
    }
  }, [newsData])
  document.title = 'Anime Site: Home'

  if (newsLoading || trendingLoading || upcomingLoading || popularLoading) return <LoaderAnimation/>

  if (trendingError || upcomingError || popularError || newsError) return <h1 className='errorText'>Error: Please refresh and try again later.</h1>

  if (newsCards && trendingData && upcomingData && popularData) return (
    <div className={styles.container}>
      {(newsCards && trendingData) && 
        <>
          <div className={styles.heroImage}></div>
          <div className={styles.content}>
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