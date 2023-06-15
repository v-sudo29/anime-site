import React, { useEffect, useRef } from 'react'

export default function CarouselButtons({currentIndex, setCurrentIndex}) {
  const parentContainer = useRef(null)
  
  async function switchAnime(e) {
    const currentButton = e.target
    const parentElement = e.target.parentElement
    const activeButton = parentElement.querySelector('.active-carousel-btn')

    if (!e.target.classList.contains('active-carousel-btn')) {

      // Remove active class from activeButton
      activeButton.classList.remove('active-carousel-btn')

      // Add active class to currentButton
      currentButton.classList.add('active-carousel-btn')

      // Change index to current button's numerical (e.g. one, two...) class
      if (currentButton.classList.contains('zero')) setCurrentIndex(0) 
      else if (currentButton.classList.contains('one')) setCurrentIndex(1)
      else if (currentButton.classList.contains('two')) setCurrentIndex(2)
      else if (currentButton.classList.contains('three')) setCurrentIndex(3)
      else if (currentButton.classList.contains('four')) setCurrentIndex(4)  
      else if (currentButton.classList.contains('five')) setCurrentIndex(5)
    }
  }

  useEffect(() => {
    let classSelector = null
    if (currentIndex === 0) classSelector = 'zero'
    else if (currentIndex === 1) classSelector = 'one'
    else if (currentIndex === 2) classSelector = 'two'
    else if (currentIndex === 3) classSelector = 'three'
    else if (currentIndex === 4) classSelector = 'four'
    else if (currentIndex === 5) classSelector = 'five'

    const prevButton = parentContainer.current.querySelector('.active-carousel-btn')
    const matchedButton = parentContainer.current.querySelector(`.${classSelector}`)

    // Remove previous active class
    prevButton.classList.remove('active-carousel-btn')

    // Add active class to matched button
    matchedButton.classList.add('active-carousel-btn')

  }, [currentIndex])
  
  return (
    <div ref={parentContainer} className='carousel-buttons-container'>
      <button onClick={(e) => switchAnime(e)} className="carousel-btn zero active-carousel-btn" type="button"></button>
      <button onClick={(e) => switchAnime(e)} className="carousel-btn one"type="button"></button>
      <button onClick={(e) => switchAnime(e)} className="carousel-btn two" type="button"></button>
      <button onClick={(e) => switchAnime(e)} className="carousel-btn three" type="button"></button>
      <button onClick={(e) => switchAnime(e)} className="carousel-btn four" type="button"></button>
      <button onClick={(e) => switchAnime(e)} className="carousel-btn five" type="button"></button>
    </div>
  )
}
