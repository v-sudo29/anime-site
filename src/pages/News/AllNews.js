import React, { useState, useEffect} from 'react'
import limitCharacters from '../../helpers/limitCharacters'

export default function AllNews() {
  const [newsData, setNewsData] = useState(null)
  const [newsCards, setNewsCards] = useState(null)

  // Fetch news data
  async function fetchNews() {
    try {
      const res = await import('../../anime-news.json')

      // Convert object to objects in array
      const newData = Object.keys(res).map(key => {
        return res[key]
      })
      // Remove last two indexes (length and default)
      const secondToLastIndex = newData.length - 2
      newData.splice(secondToLastIndex, 2)
      
      setNewsData(newData)
    } catch (error) {console.error(error)}
  }

  // Fetch data when page first loads
  useEffect(() => {
    if (!newsData) fetchNews()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Set news cards when data available
  useEffect(() => {
    if (newsData) {
      setNewsCards(newsData.map((news, index) => {
        if (news.image === 'doesn\'t exist!') {
          return null
        }
        return (
          <div key={index} className='news-page-card'>
            <img src={news.image} alt="" />
            <div className='news-page-card-info'>
              <div>{news.date}</div>
              <h3>{news.title}</h3>
              <p>{limitCharacters(news.text)}</p>
            </div>
          </div>
        )
      }))
    }
  }, [newsData])

  return (
    <div className='all-news-container'>
      <h2>What's New?</h2>
      <div className='all-news-cards-container'>
        {newsCards ? newsCards : <>...Loading</>}
      </div>
    </div>
  )
}
