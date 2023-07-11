import React from 'react'
import filterTitle from '../helpers/filterTitle'
import styles from '../styles/components/AnimeListCard.module.css'
import { Link } from 'react-router-dom'

export default function AnimeListCard({anime, index, id}) {
  return (
    <div className={styles.card}>
      <span className={styles.ranking}>{index + 1}</span>
      <div className={styles.imgContainer}>
        <Link className={styles.imageLink} to={`/anime/${id}`}>
          <img className={styles.image} src={anime['images']['jpg']['large_image_url']} alt={!anime['title_english'] ? filterTitle(anime['title']) : filterTitle(anime['title_english'])}/>
        </Link>
      </div>
      <div className={styles.info}>
        <div>
          <Link tabIndex={-1} to={`/anime/${id}`}>
            <h3 className={styles.title}>{!anime['title_english'] ? filterTitle(anime['title']) : filterTitle(anime['title_english'])}</h3>
          </Link>
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
