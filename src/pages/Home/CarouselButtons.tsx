import React, { useEffect, useRef } from 'react'
import { useMobile } from '../../context/mobileContext'
import styles from '../../styles/home/trending/CarouselButtons.module.css'

interface CarouselButtonsProps {
  currentIndex: number
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
}

const CarouselButtons = ({ currentIndex, setCurrentIndex }: CarouselButtonsProps) => {
  const parentContainer = useRef<HTMLDivElement>(null)
  const { isMobile } = useMobile()
  
  const switchAnime = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const currentButton = e.target as HTMLButtonElement
    const parentElement = currentButton.parentElement
    const activeButton = parentElement?.querySelector(`.${styles.active}`) as HTMLButtonElement

    if (!currentButton.classList.contains(`${styles.active}`)) {
      // Remove active class from activeButton
      activeButton.classList.remove(`${styles.active}`)

      // Add active class to currentButton
      currentButton.classList.add(`${styles.active}`)

      // Change index to current button's numerical (e.g. one, two...) class
      if (currentButton.classList.contains('zero')) setCurrentIndex(0) 
      else if (currentButton.classList.contains('one')) setCurrentIndex(1)
      else if (currentButton.classList.contains('two')) setCurrentIndex(2)
      else if (currentButton.classList.contains('three')) setCurrentIndex(3)
      else if (!isMobile && currentButton.classList.contains('four')) setCurrentIndex(4)  
      else if (!isMobile && currentButton.classList.contains('five')) setCurrentIndex(5)
    }
  }

  // If current index changes, switch to next/prev slide
  useEffect(() => {
    let classSelector = null
    if (currentIndex === 0) classSelector = 'zero'
    else if (currentIndex === 1) classSelector = 'one'
    else if (currentIndex === 2) classSelector = 'two'
    else if (currentIndex === 3) classSelector = 'three'
    else if (currentIndex === 4) classSelector = 'four'
    else if (currentIndex === 5) classSelector = 'five'

    if (parentContainer.current) {
      const prevButton = parentContainer.current.querySelector(`.${styles.active}`) as HTMLButtonElement
      const matchedButton = parentContainer.current.querySelector(`.${classSelector}`) as HTMLButtonElement
  
      // Remove previous active class
      prevButton?.classList.remove(`${styles.active}`)
  
      // Add active class to matched button
      matchedButton?.classList.add(`${styles.active}`)
    }
  }, [currentIndex])
  
  return (
    <div ref={parentContainer} className={styles.container}>
      <button onClick={(e) => switchAnime(e)} className={`${styles.button} zero ${styles.active}`} type="button"></button>
      <button onClick={(e) => switchAnime(e)} className={`${styles.button} one`} type="button"></button>
      <button onClick={(e) => switchAnime(e)} className={`${styles.button} two`} type="button"></button>
      <button onClick={(e) => switchAnime(e)} className={`${styles.button} three`} type="button"></button>
      {!isMobile && (
        <>
          <button onClick={(e) => switchAnime(e)} className={`${styles.button} four`} type="button"></button>
          <button onClick={(e) => switchAnime(e)} className={`${styles.button} five`} type="button"></button>        
        </>
      )}
    </div>
  )
}

export default CarouselButtons