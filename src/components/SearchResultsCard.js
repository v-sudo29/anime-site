import React from 'react'
import { Link } from 'react-router-dom'
import filterTitle from '../helpers/filterTitle'

function SearchResultsCard(props) {
  return (
    <div className='search-result-card'>
      <h3 className='search-result-title'>{props.englishTitle === null ? filterTitle(props.title) : filterTitle(props.englishTitle)}</h3>
      <div className='search-image-container'>
        <Link to={`/anime/${props.id}`}>
          <img className='search-img' src={`${props.imageUrl}`} alt="" />
        </Link>
      </div>
      <div>Genres: {props.genres}</div>
    </div>
  )
}

export default SearchResultsCard