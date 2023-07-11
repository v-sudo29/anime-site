import React from 'react'
import { Link } from 'react-router-dom'

function Card(props) {
  return (
    <div className='card'>
      <div className='card-img-container'>
        <Link to={`/top-anime/${props.id}`}>
          <img className='card-img' src={props.image} alt={props.title + ' image'} />
        </Link>
      </div>
      <h2 className={`card-title ${props.title}`}>{props.title}</h2>
      <span>Ranking: {props.ranking}</span>
    </div>
  )
}

export default Card