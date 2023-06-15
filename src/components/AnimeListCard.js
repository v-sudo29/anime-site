import React from 'react'
import filterTitle from '../helpers/filterTitle'

export default function AnimeListCard({anime, index, cardType}) {
  return (
    <div className={`${cardType}-card`}>
      <div className={`${cardType}-rank-number`}>{index + 1}</div>
      <div className={`${cardType}-img-container`}>
        <img className={`${cardType}-img`} src={anime['images']['jpg']['large_image_url']} alt='' />
      </div>
      <div className={`${cardType}-info`}>
        <div className={`${cardType}-title-and-type`}>
          <h3 className={`${cardType}-title'`}>{anime['title_english'] === null ? filterTitle(anime['title']) : filterTitle(anime['title_english'])}</h3>
          <span className={`${cardType}-type`}>TV Show</span>
        </div>
        <span className={`${cardType}-finished-date`}>Finished &#x2022; 2009-2010</span>
      </div>
      <div className={`${cardType}-score`}>
        {anime['score'] ? 
          anime['score'].toString().length > 3 ? anime['score'].toString().substring(0, 3) : anime['score'] :
          '-'
        }
      </div>
    </div>
  )
}
