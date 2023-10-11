import React from 'react'
import styles from '../../styles/character-detail/CharacterDetailsButton.module.css'
import InfoIcon from '../../icons/InfoIcon'

const CharacterDetailsButton = () => {
  return (
    <button className={styles.showDetailsButton}>
      <span className={styles.infoIconContainer}>
        <InfoIcon/>
      </span>
      Character Details
    </button>
  )
}

export default CharacterDetailsButton