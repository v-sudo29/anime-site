import React, { useState, useEffect } from 'react'
import styles from '../../styles/character-detail/VoiceActors.module.css'
import VoiceActorCard from './VoiceActorCard'
import { CharacterDetailData, Voice } from '../../types/fetchDataTypes/fetchCharacterDetailTypes'
import CarrotDownIcon from '../../icons/CarrotDownIcon'
import carrotStyles from '../../styles/icons/CarrotDownIcon.module.css'

interface IVoiceActors {
  character: CharacterDetailData
}

export default function VoiceActors({ character }: IVoiceActors) {
  const [buttonClicked, setButtonClicked] = useState(false)
  const [showAllActors, setShowAllActors] = useState(false)
  const [vaInfo, setVaInfo] = useState<Voice[] | null>(null)

  const { carrotActive } = carrotStyles

  let vaCards = null

  const animateCarrotIcon = () => {
    const carrotIcon = document.querySelector(`.${styles.carrotIconContainer} svg`)

    if (carrotIcon) {
      !buttonClicked ? carrotIcon.classList.add(`${carrotActive}`) :
        carrotIcon.classList.remove(`${carrotActive}`)
    }
  }

  const handleClick = () => {
    setShowAllActors(prev => !prev)
    animateCarrotIcon()
    setButtonClicked(prev => !prev)
  }

  useEffect(() => {
    if (character) setVaInfo(character['voices'])
  }, [character])

  if (vaInfo && !showAllActors) {
    vaCards = vaInfo.map((actor, index) => {
      if (index < 9) {
        return (
          <VoiceActorCard
            key={actor['person']['name']}
            styles={styles}
            actor={actor}
          />
        )
      }
    })
  }

  if (vaInfo && showAllActors) {
    vaCards = vaInfo.map(actor => (
      <VoiceActorCard
        key={actor['person']['name']}
        styles={styles}
        actor={actor}
      />
    ))
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Voice Actors</h2>
      <div className={styles.cardsContainer}>
        {vaCards ? vaCards : <p>No voice actors.</p>}
      </div>
      <div 
        className={styles.showActorsBtnContainer}
        onClick={handleClick}
      >
        {(vaInfo && vaInfo.length > 9) && (
          <button className={styles.actorsBtn}>
            {!showAllActors ? 'See All Voice Actors' : 'See Less'}
          </button>
        )}
        <div className={styles.carrotIconContainer}>
          <CarrotDownIcon/>
        </div>
      </div>
    </div>
  )
}
