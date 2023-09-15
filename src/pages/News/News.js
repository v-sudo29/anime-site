import React, {useState, useEffect} from 'react'
import HeroContent from './HeroContent'
import TrendingContent from './TrendingContent'
import AllNews from './AllNews'
import LoaderAnimation from '../../components/LoaderAnimation'
import styles from '../../styles/news/News.module.css'

function News() {
  const [newsData, setNewsData] = useState(null)

  document.title = 'Anime Site: News'

  // Fetch news data
  async function fetchNews() {
    try {
      const data = await import('../../anime-news.json')
      setNewsData(data)
    } catch (error) {console.error(error)}
  }

  // Fetch data when page first loads
  useEffect(() => {
    if (!newsData) fetchNews()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.container}>
      {newsData ? 
        <div className={styles.content}>
          <HeroContent featuredData={newsData.featured}/>
          <TrendingContent newsData={newsData.news}/>
          <AllNews newsData={newsData.news}/>
        </div>
      : <LoaderAnimation/>}
    </div>
  )
}

export default News