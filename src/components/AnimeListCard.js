import React from 'react'
import filterTitle from '../helpers/filterTitle'
import styles from '../styles/components/AnimeListCard.module.css'

export default function AnimeListCard({anime, index}) {
  return (
    <div className={styles.card}>
      <div>{index + 1}</div>
      <div>
        <img className={styles.image} src={anime['images']['jpg']['large_image_url']} alt='' />
      </div>
      <div className={styles.info}>
        <div>
          <h3 className={styles.title}>{anime['title_english'] === null ? filterTitle(anime['title']) : filterTitle(anime['title_english'])}</h3>
          <span className={styles.type}>{anime['type'] === 'TV' ? 'TV Show' : anime['type']}</span>
        </div>
        <span className={styles.finishedDate}>
          {anime['airing'] ? 'Airing' : 
            anime['aired']['prop']['to']['year'] ? <>Finished &#x2022; {anime['aired']['prop']['to']['year']}</> :
              <>Finished &#x2022; {anime['aired']['prop']['from']['year']}</>
            }
        </span>
      </div>
      <div className={styles.score}>
        {anime['score'] ? 
          anime['score'].toString().length > 3 ? anime['score'].toString().substring(0, 3) : anime['score'] :
          '-'
        }
      </div>
    </div>
  )
}
