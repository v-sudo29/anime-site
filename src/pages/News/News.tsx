import React, {useState, useEffect} from 'react'
import HeroContent from './HeroContent'
import TrendingContent from './TrendingContent'
import AllNews from './AllNews'
import LoaderAnimation from '../../components/LoaderAnimation'
import styles from '../../styles/news/News.module.css'
import useFetchNews from '../../hooks/useFetchJSONNews'
import { JSONNewsResponse } from '../../types/fetchDataTypes/fetchNewsTypes'

function News() {
  const [newsData, setNewsData] = useState<JSONNewsResponse | null>(null)
  const { newsData: fetchedNewsData, newsError, newsLoading } = useFetchNews()

  document.title = 'Anime Site: News'

  // Fetch data when page first loads
  useEffect(() => {
    if (!newsData) setNewsData(fetchedNewsData)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedNewsData])

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