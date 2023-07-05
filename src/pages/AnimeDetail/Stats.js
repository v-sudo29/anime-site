import React from 'react'

export default function Stats({styles, anime}) {

  function splitDates(stringDates) {
    let dates = stringDates
    let splitted = dates.split(' to ')
    let startDate = splitted[0]
    let endDate = splitted[1]
    return {startDate, endDate}
  }

  return (
    <div className={styles.statsContainer}>
      <div>Status <div>{anime.airing ? 'Airing' : 'Finished Airing'}</div> </div>
      <div>Episodes <div>{anime.episodes ? anime.episodes : '-'}</div> </div>
      <div>Episode Duration <div>{anime.duration}</div> </div>
      <div>Start Date <div>{splitDates(anime['aired']['string'])['startDate']}</div> </div>
      <div>End <div>{splitDates(anime['aired']['string'])['endDate'] === '?' || !splitDates(anime['aired']['string'])['endDate'] ? '-' : splitDates(anime['aired']['string'])['endDate']}</div> </div>
      <div>Format <div>{anime.type}</div> </div>
    </div>
  )
}
