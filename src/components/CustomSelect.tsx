import React, { useRef, useState, useEffect} from 'react'
import CarrotDown from '../icons/CarrotDown'
import styles from '../styles/components/CustomSelect.module.css'
import carrotStyles from '../styles/icons/CarrotDown.module.css'

interface ICustomSelect {
  setTopFilter: React.Dispatch<React.SetStateAction<string>>
  resetPageCount: () => void
}

export default function CustomSelect({ setTopFilter, resetPageCount } : ICustomSelect) {
  const allOptions = useRef<string[]>([''])
  const selected = useRef('')
  const selectMenuHidden = useRef(true)
  const [selectedCard, setSelectedCard] = useState<JSX.Element | null>(null)
  const [optionsCards, setOptionsCards] = useState<JSX.Element[] | null>(null)
  const { carrotActive } = carrotStyles

  // Animate carrot icon
  function animateCarrotIcon() {
    const carrotIcon = document.querySelector(`.${styles.filterCarrotContainer} svg`)

    if (carrotIcon) {
      selectMenuHidden.current ? carrotIcon.classList.remove(`${carrotActive}`) : 
      carrotIcon.classList.add(`${carrotActive}`)
    }
  }

  // Set optionCards to hidden
  function hideOptions() {
    if (allOptions.current)
    setOptionsCards(allOptions.current.map(option => {
      return (
        <div 
          key={`${option}-hidden`}
          tabIndex={0} 
          className={option === selected.current ? `${styles['optionItem']} ${styles['optionHidden']} ${styles['optionSelected']}` : `${styles['optionItem']} ${styles['optionHidden']}`}
          onClick={option === selected.current ? undefined :(e) => updateSelectedItem(e)}
        >
          {option}
        </div>
        )
    }))
    selectMenuHidden.current = true

    // Animate carrot icon
    animateCarrotIcon()
  }

  // Set optionCards to shown
  function showOptions() {
    setOptionsCards(allOptions.current.map(option => {
      return (
        <div 
          key={`${option}-not-hidden`} 
          tabIndex={0}
          className={option === selected.current ? `${styles['optionItem']} ${styles['optionSelected']}` : `${styles['optionItem']}`}
          onClick={option === selected.current ? undefined :(e) => updateSelectedItem(e)}
          onKeyDown={(e) => handleKeyPressed(e)}
        >
          {option}
        </div>
      )
      }))
    selectMenuHidden.current = false

    // Animate carrot icon
    animateCarrotIcon()
  }

  // Update the selected item if option clicked
  function updateSelectedItem(e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>) {
    const divElement = e.target as HTMLDivElement
    const selectItem = divElement.innerHTML

    // Set selectedCard and selected ref
    setSelectedCard(() => {  
      return (
        <div 
          className={`${styles['selectedOption']}`}
          onClick={openSelectMenu}
          tabIndex={0}
          onKeyDown={(e) => handleKeyPressed(e)}
        >
          {selectItem}
          <div className={styles.filterCarrotContainer} onClick={(e) => openSelectMenu(e)}>
            <CarrotDown />
          </div>
        </div>
      )
    })
    selected.current = selectItem
    setTopFilter(selected.current)
    resetPageCount()
    selectMenuHidden.current = true

    // Update selected-option (marked by hover color) in OptionCards
    setOptionsCards(allOptions.current.map(option => {
      return (
        <div
          tabIndex={0}
          key={`${option}-hidden`} 
          className={option === selected.current ? `${styles['optionItem']} ${styles['optionHidden']} ${styles['optionSelected']}` : `${styles['optionItem']} ${styles['optionHidden']}`}
          onClick={option === selected.current ? undefined :(e) => updateSelectedItem(e)}
        >
          {option}
        </div>
      )
    }))
    
    // Animate carrot icon
    animateCarrotIcon()
  }

  // Open select menu when select container is clicked
  function openSelectMenu(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation()
    selectMenuHidden.current && allOptions.current ? showOptions() : hideOptions()
  }

  // Closes select menu if user clicks outside of select container
  function closeSelectMenu(e: MouseEvent) {
    const element = e.target as HTMLElement

    if (element && !selectMenuHidden.current && (element.classList.contains(`${styles['selectedOption']}`) || (!element.classList.contains(`${styles['selectedOption']}`)))) {
      hideOptions()
    }
  }

  // Allow user to go through options with up and down key
  function handleKeyPressed(e: React.KeyboardEvent<HTMLDivElement>) {
    const key = e.key
    const optionDivElement = e.target as HTMLDivElement
    const optionSelected = optionDivElement.innerText
    const correctElement = optionDivElement.classList.contains(`${styles['selectedOption']}`)

    if (key === 'Enter' && correctElement) {
      showOptions()
    } else if (key === 'Enter' && !correctElement && selected.current !== optionSelected) {
      updateSelectedItem(e)
      hideOptions()
    }
  }

  // Set default options
  function setDefaultOptions() {

    // Find custom-select container, first option, other options
    const selectElement = document.querySelector(`.${styles['container']} select`) as HTMLSelectElement
    const firstOption = selectElement[0].innerHTML as string
    const optionsArr = []

    for (let i = 0; i < selectElement.length; i++) {
      optionsArr.push(selectElement[i].innerHTML)
    }

    // Set default select card to first option
    setSelectedCard(() => {
      return (
        <div 
          className={`${styles['selectedOption']}`}
          onClick={openSelectMenu}
          tabIndex={0}
          onKeyDown={(e) => handleKeyPressed(e)}
        >
          <span onClick={openSelectMenu} className={styles.selectedOptionText}>{firstOption}</span>
          <div className={styles.filterCarrotContainer} onClick={(e) => openSelectMenu(e)}>
            <CarrotDown />
          </div>
        </div>
      )
    })
    selected.current = firstOption

    // Set default options list
    setOptionsCards(optionsArr.map(option => {
      return (
        <div 
          key={`${option}-hidden`} 
          tabIndex={0} 
          className={option === selected.current ? `${styles['optionItem']} ${styles['optionHidden']} ${styles['optionSelected']}` : `${styles['optionItem']} ${styles['optionHidden']}`}
          onClick={option === selected.current ? undefined : (e) => updateSelectedItem(e)}
          onKeyDown={(e) => handleKeyPressed(e)}
        >
          {option}
        </div>
      )
    }))
    allOptions.current = optionsArr
  }

  // Set default select option to first option at first render
  useEffect(() => {
    if (!selectedCard) setDefaultOptions()

    document.addEventListener('click', closeSelectMenu)
    return () => document.removeEventListener('click', closeSelectMenu)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles['container']}>
      <select>
        <option value="Most Popular">Most Popular</option>
        <option value="Top Trending">Top Trending</option>
        <option value="Top Upcoming">Top Upcoming</option>
        <option value="Top TV Series">Top TV Series</option>
        <option value="Top Movies">Top Movies</option>
      </select>
      {selectedCard}
      <div className={styles['optionsContainer']}>{optionsCards}</div>
    </div>
  )
}
