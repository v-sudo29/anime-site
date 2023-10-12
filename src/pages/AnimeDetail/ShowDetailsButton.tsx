import React, { useState } from 'react'
import styles from '../../styles/anime-detail/ShowDetailsButton.module.css'
import InfoIcon from '../../icons/InfoIcon'

interface ShowDetailsButtonProps {
  isModalShown: boolean
  setIsModalShown: React.Dispatch<React.SetStateAction<boolean>>
}

const ShowDetailsButton = ({ isModalShown, setIsModalShown } : ShowDetailsButtonProps) => {
  const handleClick = () => setIsModalShown(true)

  return (
    <button onClick={handleClick} className={styles.showDetailsButton}>
      <span className={styles.infoIconContainer}>
        <InfoIcon/>
      </span>
      Show Details
    </button>
  )
}

export default ShowDetailsButton