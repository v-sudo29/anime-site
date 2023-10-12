import React, { useState, useEffect } from 'react'
import NewsCard from './NewsCard'
import styles from '../../styles/anime-detail/News.module.css'
import { AnimeDetailNewsResponse, AnimeDetailNewsDatum } from '../../types/fetchDataTypes/fetchAnimeDetailNewsTypes'

const News = ({ id } : { id: string | undefined}) => {
  const [newsInfo, setNewsInfo] = useState<AnimeDetailNewsDatum[] | null>(null)

  // Sort articles by most recent date
  function sortByDate(data: AnimeDetailNewsDatum[]) {
    return data.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (dateA > dateB) return -1;
      if (dateB > dateA) return 1;
      return 0;
    })
  }

  // Fetch news anime data
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    
    const timer = setTimeout(() => {

        fetch(`https://api.jikan.moe/v4/anime/${id}/news`, {
          signal: signal
        })
          .then(response => {
            if (response.ok) return response.json()
            throw response
          })
          .then((data: AnimeDetailNewsResponse) => (setNewsInfo(sortByDate(data.data))))
          .catch(() => {
            if (signal.aborted) {
              console.log('The user aborted the request')
            } else {
              console.error('The request failed')
            }
          })
    }, 1600)
    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [id])

  const newsCards = (newsInfo && newsInfo.length > 0) ? 
    newsInfo.map((article, index) => {
      if (index < 4) {
        return (
          <NewsCard 
            key={article['title'] + index}
            styles={styles}
            article={article}
          />
        )
      } return null
    }) : null

  return (
    <div className={`${styles.newsContainer} news`}>
      <h2 className={styles.sectionTitle}>News</h2>
      {newsCards ? 
        <div className={styles.newsCardsContainer}>
          {newsCards}
        </div>
      : <p className={styles.defaultText}>No news at this time.</p>}
    </div>
  )
}

export default News