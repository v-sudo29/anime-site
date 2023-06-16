import React from 'react'
import HeroContent from './HeroContent'
import TrendingContent from './TrendingContent'
import AllNews from './AllNews'


function News() {
  return (
    <div className='news-container'>
      <div className='news-background-image'></div>
      <div className='news-content'>
        <HeroContent/>
        <TrendingContent/>
        <AllNews/>
      </div>
    </div>
  )
}

export default News