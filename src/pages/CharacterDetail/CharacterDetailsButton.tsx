import React from 'react'
import styles from '../../styles/character-detail/CharacterDetailsButton.module.css'
import InfoIcon from '../../icons/InfoIcon'

interface CharacterDetailsButtonProps {
  setIsModalShown: React.Dispatch<React.SetStateAction<boolean>>
}

const CharacterDetailsButton = ({ setIsModalShown } : CharacterDetailsButtonProps) => {
  const handleClick = () => {
    setIsModalShown(true)
  }
  return (
    <button onClick={handleClick} className={styles.showDetailsButton}>
      <span className={styles.infoIconContainer}>
        <InfoIcon/>
      </span>
      Character Details
    </button>
  )
}

export default CharacterDetailsButton