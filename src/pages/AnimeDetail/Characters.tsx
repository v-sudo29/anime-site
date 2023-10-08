import React, { useState } from 'react'
import styles from '../../styles/anime-detail/Characters.module.css'
import useFetchCharacters from '../../hooks/useFetchCharacters'
import CharacterCard from './CharacterCard'
import { AnimeDetailData } from '../../types/fetchDataTypes/fetchAnimeDetailTypes'
import CarrotDownIcon from '../../icons/CarrotDownIcon'
import carrotStyles from '../../styles/icons/CarrotDownIcon.module.css'

interface ICharacters {
  anime: AnimeDetailData
  id: string | undefined
}

export default function Characters({ anime, id } : ICharacters) {
  const [buttonClicked, setButtonClicked] = useState(false)
  const { charactersData } = useFetchCharacters(anime, id)
  const [allCharacters, setAllCharacters] = useState(false)
  const { carrotActive } = carrotStyles
  let characterCards = null

  const animateCarrotIcon = () => {
    const carrotIcon = document.querySelector(`.${styles.carrotIconContainer} svg`)

    if (carrotIcon) {
      !buttonClicked ? carrotIcon.classList.add(`${carrotActive}`) :
        carrotIcon.classList.remove(`${carrotActive}`)
    }
  }

  const handleClick = () => {
    setAllCharacters(prev => !prev)
    animateCarrotIcon()
    setButtonClicked(prev => !prev)
  }

  if (charactersData && !allCharacters) characterCards = charactersData.map((character, index) => 
    (index < 9 && 
      <CharacterCard 
        key={character['character']['name']}
        styles={styles} 
        character={character}
      /> 
    ))

  if (charactersData && allCharacters) characterCards = charactersData.map(character => (
    <CharacterCard
      key={character['character']['name']}
      styles={styles} 
      character={character}
    />
  ))  

  return (
    <div className={`${styles.charactersSection} characters`}>
      <h2 className={styles.sectionTitle}>Characters</h2>
      {charactersData && charactersData.length > 0 ? 
        <div className={styles.charactersContainer}>
          {characterCards}
        </div>
      : <p className={styles.defaultText}>No characters available.</p>
      }
      {charactersData && 
      <div 
        onClick={handleClick} 
        className={styles.charactersBtnContainer}
      >       
        <button className={styles.charactersBtn}>
          {allCharacters ? 'See Less Characters' : 'See Full Character List'}
        </button>
        <div className={styles.carrotIconContainer}>
          <CarrotDownIcon/>
        </div>
      </div>
      }
    </div>
  )
}
