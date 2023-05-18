import React from 'react'

function Card(props) {
  return (
    <div className='card'>
      <div className='card-img-container'>
        <img className='card-img' src={props.image} alt="" />
      </div>
      <h2 className={`card-title ${props.title}`}>{props.title}</h2>
      <div>Ranking: {props.ranking}</div>
    </div>
  )
}

export default Card