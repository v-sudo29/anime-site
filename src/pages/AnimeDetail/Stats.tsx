import React from 'react'
import styles from '../../styles/anime-detail/Stats.module.css'
import { AnimeDetailData } from '../../types/fetchDataTypes/fetchAnimeDetailTypes'

export default function Stats({ anime } : { anime: AnimeDetailData }) {

  const splitDates = (stringDates: string) => {
    let dates = stringDates
    let splitted = dates.split(' to ')
    let startDate = splitted[0]
    let endDate = splitted[1]
    return { startDate, endDate }
  }

  const uppercaseFirstLetters = (string: string) => {
    const arr = string.split(' ')

    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i][0].toUpperCase() + arr[i].substr(1)
    }
    const newString = arr.join(' ')
    return newString
  }

  const status = uppercaseFirstLetters(anime.status)
  const episodes = anime.episodes ?? '-'
  const duration = anime.duration
  const startDate = splitDates(anime['aired']['string'])['startDate']
  const endDate = splitDates(anime['aired']['string'])['endDate'] === '?' || splitDates(anime['aired']['string'])['endDate'] 
    ? '-' : splitDates(anime['aired']['string'])['endDate']
  const genres = anime.genres.map(genre => genre.name).length > 1 ? anime.genres.map(genre => genre.name).join(', ')
    : anime.genres.map(genre => genre.name)
  const viewerRating = anime['score'] ? anime['score'].toString().length > 3 ? anime['score'].toString().substring(0, 3) 
    : anime['score'] : '-'

  return (
    <div className={styles.statsContainer}>
      <div>Status 
        <p>{status}</p>
      </div>
      <div>Episodes
        <p>{episodes}</p> 
      </div>
      <div>Episode Duration
        <p>{duration}</p>
      </div>
      <div>Start Date
        <p>{startDate}</p>
      </div>
      <div>End
        <p>{endDate}</p>
      </div>
      <div>Format
        <p>{anime.type}</p>
      </div>
      <div>Genres
        <p>{genres}</p>
      </div>
      <div>Viewer Rating
        <p>{viewerRating} <span className={styles.dashAndTen}>/ 10</span></p>
      </div>
    </div>
  )
}
