import React from 'react'
import { Link } from 'react-router-dom'
import arrowIcon from '../assets/arrow-icon.png'

export default function ReadMoreBtn() {
  return (
    <div className='read-more-link-container'>
      <Link className='read-more-link'>
        Read More
        <img src={arrowIcon} alt="" />
      </Link>
    </div>
  )
}
