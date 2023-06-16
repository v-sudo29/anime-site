import React from 'react'
import ReadMoreBtn from '../../components/ReadMoreBtn'


export default function HeroContent() {

  return (
    <div className='news-hero-container'>
      <div className='news-hero-image'></div>
      <div className='news-hero-info'>
        <div className='news-hero-text'>
          <div>March 21, 2020</div>
          <h2>Lorem ipsum dolor sit amet consectetur. Commodo elementum</h2>
        </div>
        <ReadMoreBtn />
      </div>
    </div>
  )
}
