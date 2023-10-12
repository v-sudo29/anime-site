import React, { useState } from 'react'
import styles from '../../styles/anime-detail/Synopsis.module.css'
import carrotStyles from '../../styles/icons/CarrotDownIcon.module.css'
import CarrotDownIcon from '../../icons/CarrotDownIcon'
import limitCharacters from '../../helpers/limitCharacters'
import { AnimeDetailData } from '../../types/fetchDataTypes/fetchAnimeDetailTypes'

const Synopsis = ({ anime } : { anime: AnimeDetailData | null }) => {
  const [buttonClicked, setButtonClicked] = useState(false)
  const { carrotActive } = carrotStyles

  if (anime) {
    const synopsis = buttonClicked ? anime.synopsis : limitCharacters(anime.synopsis, 500)

    const handleClick = () => {
      setButtonClicked(prev => !prev)
      animateCarrotIcon()
    }

    const animateCarrotIcon = () => {
      const carrotIcon = document.querySelector(`.${styles.carrotIconContainer} svg`)
  
      if (carrotIcon) {
        !buttonClicked ? carrotIcon.classList.add(`${carrotActive}`) :
          carrotIcon.classList.remove(`${carrotActive}`)
      }
    }

    return (
      <>
        <p className={styles.synopsis}>{synopsis}</p>
        {synopsis.length > 500 && (
          <div onClick={handleClick} className={styles.readMoreBtnContainer}>
            <button className={styles.readMoreBtn}>{buttonClicked ? 'See Less' : 'Read More'}</button>
            <div className={styles.carrotIconContainer}>
              <CarrotDownIcon/>
            </div>
          </div>
        )}
      </>      
    )
  }

}

export default Synopsis