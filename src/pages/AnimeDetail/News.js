import React, { useState, useEffect } from 'react'

export default function News({styles, id}) {
  const [newsInfo, setNewsInfo] = useState(null)
  const [newsCards, setNewsCards] = useState(null)
  const brokenImage = 'https://cdn.myanimelist.net/images/company/placeholder.png'

  function sortByDate(data) {
    return data.sort((a, b) => {
      const dateA = a.date
      const dateB = b.date
      const splitA = dateA.split('T')[0].split('-').join('')
      const splitB = dateB.split('T')[0].split('-').join('')

      if (splitA > splitB) return -1
      else if (splitB > splitA) return 1
      else return 0
    })
  }

  function convertDate(date) {
    const dateA = date.split('T')[0].split('-')
    let month = null
    let day = dateA[2]
    let year = dateA[0]

    if (dateA[1] === '01') month = 'January'
    if (dateA[1] === '02') month = 'February'
    if (dateA[1] === '03') month = 'March'
    if (dateA[1] === '04') month = 'April'
    if (dateA[1] === '05') month = 'May'
    if (dateA[1] === '06') month = 'June'
    if (dateA[1] === '07') month = 'July'
    if (dateA[1] === '08') month = 'August'
    if (dateA[1] === '09') month = 'September'
    if (dateA[1] === '10') month = 'October'
    if (dateA[1] === '11') month = 'November'
    if (dateA[1] === '12') month = 'December'
    
    const finalDate = `${month} ${day}, ${year}`
    return finalDate
  }

  const imageOnError = (event) => {
    event.currentTarget.src = brokenImage;
    event.currentTarget.className = "errorImage";
  };

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${id}/news`)
      .then(res => res.json())
      .then(data => (setNewsInfo(sortByDate(data.data))))
  }, [id])

  useEffect(() => {
    if (newsInfo) {
      // eslint-disable-next-line array-callback-return
      setNewsCards(newsInfo.map((article, index) => {
        if (index < 4) {
          const filteredDate = convertDate(article.date)
          return (
            <div key={article['title'] + index} className={styles.newsCard}>
              <a href={article['url']} target="_blank" rel="noreferrer">
                <img onError={imageOnError} className={styles.newsImg} src={article['images']['jpg']['image_url'] ? article['images']['jpg']['image_url'] : null} alt="" />
              </a>
              <div className={styles.newsDate}>{filteredDate}</div>
              <div className={styles.newsName}>{article['title']}</div>
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
      <h3>Main Series</h3>
      <div className={styles.newsCardsContainer}>
        {newsCards ? newsCards : null}
      </div>
    </div>
  )
}
