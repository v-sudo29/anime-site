import React from 'react'
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
import FetchError from '../../components/FetchError'
import styles from '../../styles/home/Home.module.css'

function Home() {
  const { newsData, newsError, newsLoading } = useFetchNews()
  const { trendingData, trendingError, trendingLoading } = useFetchTrending()
  const { upcomingData, upcomingError, upcomingLoading } = useFetchUpcoming()
  const { popularData, popularError, popularLoading } = useFetchPopular()
  let newsCards = null

  if (newsData) newsCards = newsData.map((news, index) => 
    (index < 5) &&
      <NewsCard
        key={news.title}
        news={news}
      />
  )

  document.title = 'Anime Site: Home'

  if (newsLoading || trendingLoading || upcomingLoading || popularLoading) return <LoaderAnimation/>

  if (trendingError || upcomingError || popularError || newsError) return <FetchError/>

  if (newsCards && trendingData && upcomingData && popularData) return (
    <div className={styles.container}>
      {(newsCards && trendingData) && 
        <>
          <div className={styles.heroImage}></div>
          <div className={styles.content}>
            <LatestNews newsData={newsData} newsCards={newsCards}/>
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