import React from 'react'
import { Link } from 'react-router-dom'

import arrowIcon from '../../assets/arrow-icon.png'

export default function LatestNews({newsCards}) {

  return (
    <section className='home-news-container'>
      <div className='home-news-header'>
        <h2>Latest Anime News</h2>
        <Link className='more-news-link' to='/news'>
          More News
          <img src={arrowIcon} alt="" />
        </Link>
      </div>
      <div className='home-news-cards-container'>
        {newsCards ? newsCards : <div className='home-news-default-div'></div> }
      </div>
    </section>
  )
}