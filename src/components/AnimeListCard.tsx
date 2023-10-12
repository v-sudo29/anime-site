import React from 'react'
import filterTitle from '../helpers/filterTitle'
import styles from '../styles/components/AnimeListCard.module.css'
import { Link } from 'react-router-dom'
import { useMobile } from '../context/mobileContext'
import { SingleSearchedAnime } from '../types/stateTypes/AnimeListTypes'

interface AnimeListCardProps {
  anime: SingleSearchedAnime
  index: number
  id: number
}

const AnimeListCard = ({ anime, index, id } : AnimeListCardProps) => {
  const { isMobile } = useMobile()
  return (
    <>
      {/* MOBILE */}
      {isMobile && (
        <Link className={styles.card} to={`/anime/${id}`}>
          <div className={styles.imgContainer}>
            <span className={styles.ranking}>{index + 1}</span>
            <img
              className={styles.image}
              src={anime['images']['jpg']['large_image_url']}
              alt={anime['title_english'] ? filterTitle(anime['title_english']) : filterTitle(anime['title'])}
            />
          </div>
          <h3 className={styles.title}>{anime['title_english'] ? filterTitle(anime['title_english']) : filterTitle(anime['title'])}</h3>
        </Link>
      )}

      {/* DESKTOP */}
      {!isMobile && (
        <Link className={styles.card} to={`/anime/${id}`}>
          <span className={styles.ranking}>{index + 1}</span>
          <div className={styles.imgContainer}>
            <img
              className={styles.image}
              src={anime['images']['jpg']['large_image_url']}
              alt={anime['title_english'] ? filterTitle(anime['title_english']) : filterTitle(anime['title'])}
            />
          </div>
          <div className={styles.info}>
            <div>
              <h3 className={styles.title}>{anime['title_english'] ? filterTitle(anime['title_english']) : filterTitle(anime['title'])}</h3>
              <span className={styles.type}>{anime['type'] === 'TV' ? 'TV Show' : anime['type']}</span>
            </div>
            <span className={styles.finishedDate}>
              {/* Airing Status */}
              {anime['status'] === 'Finished Airing' && 'Finished'}
              {anime['status'] === 'Currently Airing' && 'Airing'}
              {anime['status'] === 'Not yet aired' && 'Not Yet Aired'}

              {/* Year Aired */}
              {anime['aired']['prop']['to']['year'] ? 
                <>&nbsp;&#x2022; {anime['aired']['prop']['to']['year']}</> :
                anime['aired']['prop']['from']['year'] ? <>&nbsp;&#x2022; {anime['aired']['prop']['from']['year']}</> :
                <></>
              }
            </span>
          </div>
          <div className={styles.score}>
            {anime['score'] ? 
              anime['score'].toString().length > 3 ? anime['score'].toString().substring(0, 3) 
              : anime['score'] : '-'
            }
          </div>
        </Link>
      )}
    </>   
  )
}

export default AnimeListCard