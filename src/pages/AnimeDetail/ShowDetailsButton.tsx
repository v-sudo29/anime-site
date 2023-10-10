import React from 'react'
import styles from '../../styles/anime-detail/ShowDetailsButton.module.css'
import InfoIcon from '../../icons/InfoIcon'

const ShowDetailsButton = () => {
  return (
    <button className={styles.showDetailsButton}>
      <span className={styles.infoIconContainer}>
        <InfoIcon/>
      </span>
      Show Details
    </button>
  )
}

export default ShowDetailsButton