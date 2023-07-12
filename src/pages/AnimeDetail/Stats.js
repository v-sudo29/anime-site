import React from 'react'
import styles from '../../styles/anime-detail/Stats.module.css'

export default function Stats({anime}) {

  function splitDates(stringDates) {
    let dates = stringDates
    let splitted = dates.split(' to ')
    let startDate = splitted[0]
    let endDate = splitted[1]
    return {startDate, endDate}
  }

  function uppercaseFirstLetters(string) {
    const arr = string.split(' ')

    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i][0].toUpperCase() + arr[i].substr(1)
    }
    const newString = arr.join(' ')
    return newString
  }

  return (
    <div className={styles.statsContainer}>
      <div>Status <p>{uppercaseFirstLetters(anime.status)}</p> </div>
      <div>Episodes <p>{anime.episodes ?? '-'}</p> </div>
      <div>Episode Duration <p>{anime.duration}</p> </div>
      <div>Start Date <p>{splitDates(anime['aired']['string'])['startDate']}</p> </div>
      <div>End <p>{splitDates(anime['aired']['string'])['endDate'] === '?' || !splitDates(anime['aired']['string'])['endDate'] ? '-' : splitDates(anime['aired']['string'])['endDate']}</p> </div>
      <div>Format <p>{anime.type}</p> </div>
    </div>
  )
}
