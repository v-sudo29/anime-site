import React, { useState, useEffect } from 'react'
import styles from '../../styles/character-detail/VoiceActors.module.css'
import VoiceActorCard from './VoiceActorCard'
import CarrotDownIcon from '../../icons/CarrotDownIcon'
import carrotStyles from '../../styles/icons/CarrotDownIcon.module.css'
import { CharacterDetailData, Voice } from '../../types/fetchDataTypes/fetchCharacterDetailTypes'

interface VoiceActorsProps {
  character: CharacterDetailData
  isTwoColumn: boolean
}

const VoiceActors = ({ character, isTwoColumn }: VoiceActorsProps) => {
  const [buttonClicked, setButtonClicked] = useState(false)
  const [showAllActors, setShowAllActors] = useState(false)
  const [vaInfo, setVaInfo] = useState<Voice[] | null>(null)

  const { carrotActive } = carrotStyles
  let vaCards: (JSX.Element| undefined)[] = []

  const animateCarrotIcon = (): void => {
    const carrotIcon = document.querySelector(`.${styles.carrotIconContainer} svg`)

    if (carrotIcon) {
      !buttonClicked ? carrotIcon.classList.add(`${carrotActive}`) :
        carrotIcon.classList.remove(`${carrotActive}`)
    }
  }

  const handleClick = (): void => {
    setShowAllActors(prev => !prev)
    animateCarrotIcon()
    setButtonClicked(prev => !prev)
  }

  // When character data is available, set voice actor info in state
  useEffect(() => {
    if (character) setVaInfo(character['voices'])
  }, [character])

  // Set limited # of voice actor cards
  if (vaInfo && !showAllActors) {
    vaCards = vaInfo.map((actor, index) => {
      if (index < 9 && !isTwoColumn) {
        return (
          <VoiceActorCard
            key={actor['person']['name']}
            styles={styles}
            actor={actor}
          />
        )
      }
      if (index < 8 && isTwoColumn) {
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

  // Set all voice actor cards
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
        {vaCards ?? <p>No voice actors.</p>}
      </div>
      
      {/* MOBILE */}
      {(isTwoColumn && vaCards.length > 8) && (
        <div className={styles.showActorsBtnContainer} onClick={handleClick}>
          <button className={styles.actorsBtn}>
            {(showAllActors && isTwoColumn) ? 'See Less' : 'See More'}
          </button>
          <div className={styles.carrotIconContainer}>
            <CarrotDownIcon/>
          </div>
        </div>
      )}

      {/* DESKTOP */}
      {(!isTwoColumn && vaCards.length > 9) && (
        <div className={styles.showActorsBtnContainer} onClick={handleClick}>
          <button className={styles.actorsBtn}>
            {(showAllActors && !isTwoColumn) ? 'See Less' : 'See More'}
          </button>
          <div className={styles.carrotIconContainer}>
            <CarrotDownIcon/>
          </div>
        </div>
      )}
    </div>
  )
}

export default VoiceActors