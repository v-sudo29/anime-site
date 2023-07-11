import React, { useState, useEffect } from 'react'
import imageOnError from '../../helpers/imageOnError.js'
import styles from '../../styles/anime-detail/News.module.css'

export default function News({id}) {
  const [newsInfo, setNewsInfo] = useState(null)
  const [newsCards, setNewsCards] = useState(null)

  function sortByDate(data) {
    return data.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (dateA > dateB) return -1;
      if (dateB > dateA) return 1;
      return 0;
    })
  }

  function convertDate(date) {
    return new Date(date).toLocaleDateString('en-us', { year: 'numeric', month: 'short', day: 'numeric' });
  }

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
          .then(data => (setNewsInfo((data.data))))
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

  useEffect(() => {
    if (newsInfo) setNewsInfo(prev => sortByDate(prev))
  }, [newsInfo])

  useEffect(() => {
    if (newsInfo && newsInfo.length > 0) {
      // eslint-disable-next-line array-callback-return
      setNewsCards(newsInfo.map((article, index) => {
        if (index < 4) {
          const filteredDate = convertDate(article.date)
          return (
            <div key={article['title'] + index} className={styles.newsCard}>
              <div className={styles.newsImgContainer}>
                <a href={article['url']} target="_blank" rel="noopener noreferrer">
                  <img 
                    onError={imageOnError}
                    className={styles.newsImg} 
                    src={article['images']['jpg']['image_url']} 
                    alt="" />
                </a>
              </div>    
              <div className={styles.newsDate}>{filteredDate}</div>
              <a href={article['url']} target="_blank" rel="noopener noreferrer">
                <div className={styles.newsName}>{article['title']}</div>
              </a>
            </div>
          )
        } return null
      }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newsInfo])

  return (
    <div className={`${styles.newsContainer} news`}>
      <h2 className={styles.sectionTitle}>News</h2>
      {newsCards ? 
      <>
        <h3>Main Series</h3>
        <div className={styles.newsCardsContainer}>
          {newsCards}
        </div>
      </>
      : <p className={styles.defaultText}>No news at this time.</p>}
    </div>
  )
}
