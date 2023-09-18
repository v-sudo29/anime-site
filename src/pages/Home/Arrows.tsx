import React from 'react'
import styles from '../../styles/home/trending/Arrows.module.css'

interface IArrows {
  currentIndex: number
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
}

export default function Arrows({ currentIndex, setCurrentIndex }: IArrows) {

  function nextAnime() {
    if (currentIndex === 5) setCurrentIndex(0)
    else setCurrentIndex(prev => prev + 1)
  }

  function prevAnime() {
    if (currentIndex === 0) setCurrentIndex(5)
    else setCurrentIndex(prev => prev - 1)
  }

  return (
    <div className={styles.container}>
      <div onClick={() => prevAnime()} className={styles.arrow}> &#60; </div>
      <div onClick={() => nextAnime()} className={styles.arrow}> &#62; </div>
    </div>
  )
}
