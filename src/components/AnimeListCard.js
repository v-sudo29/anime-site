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
          <span className={`${cardType}-type`}>{anime['type'] === 'TV' ? 'TV Show' : anime['type']}</span>
        </div>
        <span className={`${cardType}-finished-date`}>
          {anime['airing'] ? 'Airing' : 
            anime['aired']['prop']['to']['year'] ? <>Finished &#x2022; {anime['aired']['prop']['to']['year']}</> :
              <>Finished &#x2022; {anime['aired']['prop']['from']['year']}</>
            }
        </span>
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
