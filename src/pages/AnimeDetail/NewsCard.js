import React from 'react'
import imageOnError from '../../helpers/imageOnError'

export default function NewsCard({styles, article}) {
  
  function convertDate(date) {
    return new Date(date).toLocaleDateString('en-us', { year: 'numeric', month: 'short', day: 'numeric' });
  }
  const filteredDate = convertDate(article.date)

  return (
    <div className={styles.newsCard}>
      <div className={styles.newsImgContainer}>
        <a className={styles.anchorContainer} href={article['url']} target="_blank" rel="noopener noreferrer">
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
}
