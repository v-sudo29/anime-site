import React, {useState, useEffect} from 'react'
import HeroContent from './HeroContent'
import TrendingContent from './TrendingContent'
import AllNews from './AllNews'
import LoaderAnimation from '../../components/LoaderAnimation'
import styles from '../../styles/news/News.module.css'

function News() {
  const [trendingNews, setTrendingNews] = useState(null)

  document.title = 'Anime Site: News'

  // Fetching trending news data
  async function fetchTrendingNews() {
    try {
      const res = await import('../../anime-trending-news.json')
      // Convert object to objects in array
      const newData = Object.keys(res).map(key => {
        return res[key]
      })
      // Remove last two indexes (length and default)
      const secondToLastIndex = newData.length - 2
      newData.splice(secondToLastIndex, 2)
      
      setTrendingNews(newData)
    } catch (error) {console.error(error)}
  }

  useEffect(() => {
    if (!trendingNews) fetchTrendingNews()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.container}>
      {trendingNews ? 
      <>
        <div className={styles.backgroundImg}></div>
        <div className={styles.content}>
          <HeroContent/>
          <TrendingContent
            trendingNews={trendingNews}
          />
          <AllNews/>
        </div>
      </>
      : <LoaderAnimation/>}
    </div>
  )
}

export default News