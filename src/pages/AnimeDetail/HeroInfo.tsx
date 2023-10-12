import React, { useState } from 'react'
import styles from '../../styles/anime-detail/HeroInfo.module.css'
import limitCharacters from '../../helpers/limitCharacters'
import CarrotDownIcon from '../../icons/CarrotDownIcon'
import carrotStyles from '../../styles/icons/CarrotDownIcon.module.css'
import { AnimeDetailData } from '../../types/fetchDataTypes/fetchAnimeDetailTypes'

const HeroInfo = ({ anime } : { anime: AnimeDetailData | null }) => {
  const [buttonClicked, setButtonClicked] = useState(false)
  const { carrotActive } = carrotStyles

  if (anime) {
    const ranking = anime.rank
    const title = anime.title_english ?? anime.title_japanese
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
      <div className={styles.container}>
        <span className={styles.rank}>#{ranking}</span>
        <h2 className={styles.animeTitle}>{title}</h2>
        <p className={styles.synopsis}>{synopsis}</p>
        {synopsis.length > 500 ? (
          <div onClick={handleClick} className={styles.readMoreBtnContainer}>
            <button className={styles.readMoreBtn}>{buttonClicked ? 'See Less' : 'Read More'}</button>
            <div className={styles.carrotIconContainer}>
              <CarrotDownIcon/>
            </div>
          </div>
        ) : <></>
        }
      </div>
    )
  }
  else return <></>
}

export default HeroInfo