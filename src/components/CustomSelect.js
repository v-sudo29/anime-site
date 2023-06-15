import React, { useRef, useState, useEffect} from 'react'
import CarrotDown from '../icons/CarrotDown'

export default function CustomSelect({setTopFilter}) {
  const allOptions = useRef(null)
  const selected = useRef(null)
  const selectMenuHidden = useRef(true)
  const [selectedCard, setSelectedCard] = useState(null)
  const [optionsCards, setOptionsCards] = useState(null)

  // Function animate carrot icon
  function animateCarrotIcon() {
    const carrotIcon = document.querySelector('.filter-carrot-container svg')

    selectMenuHidden.current ? carrotIcon.classList.remove('carrot-active') : 
      carrotIcon.classList.add('carrot-active')
  }

  // Function set optionCards to hidden
  function hideOptions(e) {
    setOptionsCards(allOptions.current.map(option => {
      return (
        <div 
          key={`${option}-hidden`}
          tabIndex='0'  
          className={option === selected.current ? 'option-item option-hidden option-selected' : 'option-item option-hidden'}
          onClick={option === selected.current ? null :(e) => updateSelectedItem(e)}
        >
          {option}
        </div>
        )
    }))
    selectMenuHidden.current = true

    // Animate carrot icon
    animateCarrotIcon()
  }

  // Function set optionCards to shown
  function showOptions(e) {
    setOptionsCards(allOptions.current.map(option => {
      return (
        <div 
          key={`${option}-not-hidden`} 
          tabIndex='0' 
          className={option === selected.current ? 'option-item option-selected' : 'option-item'}
          onClick={option === selected.current ? null :(e) => updateSelectedItem(e)}
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

// Function that updates the selected item if option clicked
function updateSelectedItem(e) {
  const selectItem = e.target.innerHTML

  // Set selectedCard and selected ref
  setSelectedCard(() => {  
    return (
      <div 
        className='selected-option'
        onClick={openSelectMenu}
        tabIndex='0'
        onKeyDown={(e) => handleKeyPressed(e)}
      >
        {selectItem}
        <div className='filter-carrot-container' onClick={(e) => openSelectMenu(e)}>
          <CarrotDown   
            // onClick={(e) => openSelectMenu(e)}
            hidden={selectMenuHidden.current}
          />
        </div>
      </div>
    )
  })
  selected.current = selectItem
  setTopFilter(selected.current)
  selectMenuHidden.current = true

  // Update selected-option (marked by hover color) in OptionCards
  setOptionsCards(allOptions.current.map(option => {
    return (
      <div
        tabIndex='0' 
        key={`${option}-hidden`} 
        className={option === selected.current ? 'option-item option-hidden option-selected' : 'option-item option-hidden'}
        onClick={option === selected.current ? null :(e) => updateSelectedItem(e)}
      >
        {option}
      </div>
    )
  }))
  
  // Animate carrot icon
  animateCarrotIcon()
}

// Function that opens select menu when selected item is clicked
function openSelectMenu(e) {
  e.stopPropagation()
  selectMenuHidden.current && allOptions.current ? showOptions() : hideOptions()
}

// Function closes select menu if user clicks outside of select container
function closeSelectMenu(e) {
  if (!e.target.classList.contains('selected-option') && !selectMenuHidden.current) {
    hideOptions()
  }
}

// Function lets user go through options with up and down key
function handleKeyPressed(e) {
  const key = e.key
  const optionSelected = e.target.innerText
  const correctElement = e.target.classList.contains('selected-option')

  if (key === 'Enter' && correctElement) {
    showOptions()
  } else if (key === 'Enter' && !correctElement && selected.current !== optionSelected){
    updateSelectedItem(e)
    hideOptions()
  }
}

useEffect(() => {
  if (!selectedCard) {

    // Find custom-select container, first option, other options
    const selectElement = document.querySelector('.custom-select select')
    const firstOption = selectElement[0].innerHTML
    const optionsArr = []

    for (let i = 0; i < selectElement.length; i++) {
      optionsArr.push(selectElement[i].innerHTML)
    }

    // Set default select card to first option
    setSelectedCard(() => {
      return (
        <div 
          className='selected-option'
          onClick={openSelectMenu}
          tabIndex='0'
          onKeyDown={(e) => handleKeyPressed(e)}
        >
          {firstOption}
          <div className='filter-carrot-container' onClick={(e) => openSelectMenu(e)}>
            <CarrotDown 
              // onClick={(e) => openSelectMenu(e)} 
              hidden={selectMenuHidden.current}
            />
          </div>
        </div>
      )
    })
    selected.current = firstOption
    setTopFilter(selected.current)

    // Set default options list
    setOptionsCards(optionsArr.map(option => {
      return (
        <div 
          key={`${option}-hidden`} 
          tabIndex='0' 
          className={option === selected.current ? 'option-item option-hidden option-selected' : 'option-item option-hidden'}
          onClick={option === selected.current ? null :(e) => updateSelectedItem(e)}
          onKeyDown={(e) => handleKeyPressed(e)}
        >
          {option}
        </div>
      )
    }))
    allOptions.current = optionsArr
  }

  document.addEventListener('click', closeSelectMenu)
  return () => document.removeEventListener('click', closeSelectMenu)

// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <div className="custom-select">
      <select>
        <option value="Most Popular">Most Popular</option>
        <option value="Top Trending">Top Trending</option>
        <option value="Top Upcoming">Top Upcoming</option>
        <option value="Top TV Series">Top TV Series</option>
        <option value="Top Movies">Top Movies</option>
      </select>
      {selectedCard}
      <div className='options-container'>{optionsCards}</div>
    </div>
  )
}
