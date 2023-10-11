import React, { useState, useEffect } from 'react'
import styles from '../../styles/character-detail/VoiceActors.module.css'
import VoiceActorCard from './VoiceActorCard'
import { CharacterDetailData, Voice } from '../../types/fetchDataTypes/fetchCharacterDetailTypes'
import CarrotDownIcon from '../../icons/CarrotDownIcon'
import carrotStyles from '../../styles/icons/CarrotDownIcon.module.css'

interface VoiceActorsProps {
  character: CharacterDetailData,
  isDetailMobile: boolean
}

export default function VoiceActors({ character, isDetailMobile }: VoiceActorsProps) {
  const [buttonClicked, setButtonClicked] = useState(false)
  const [showAllActors, setShowAllActors] = useState(false)
  const [vaInfo, setVaInfo] = useState<Voice[] | null>(null)

  const { carrotActive } = carrotStyles
  let vaCards: (JSX.Element| undefined)[] = []

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
      if (index < 9 && !isDetailMobile) {
        return (
          <VoiceActorCard
            key={actor['person']['name']}
            styles={styles}
            actor={actor}
          />
        )
      }
      if (index < 8 && isDetailMobile) {
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
      
      {/* MOBILE */}
      {(isDetailMobile && vaCards.length > 8) && (
        <div className={styles.showActorsBtnContainer} onClick={handleClick}>
          <button className={styles.actorsBtn}>
            {(showAllActors && isDetailMobile) ? 'See Less' : 'See More'}
          </button>
          <div className={styles.carrotIconContainer}>
            <CarrotDownIcon/>
          </div>
        </div>
      )}

      {/* DESKTOP */}
      {(!isDetailMobile && vaCards.length > 9) && (
        <div className={styles.showActorsBtnContainer} onClick={handleClick}>
          <button className={styles.actorsBtn}>
            {(showAllActors && isDetailMobile) ? 'See Less' : 'See More'}
          </button>
          <div className={styles.carrotIconContainer}>
            <CarrotDownIcon/>
          </div>
        </div>
      )}

    </div>
  )
}
