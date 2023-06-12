import React from 'react'

export default function CarouselButtons({setCurrentIndex}) {
  async function switchAnime(e) {
    const currentButton = e.target
    const parentContainer = e.target.parentElement
    const activeButton = parentContainer.querySelector('.active-carousel-btn')

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
    }
  }
  return (
    <div className='carousel-buttons-container'>
      <button onClick={(e) => switchAnime(e)} className="carousel-btn zero active-carousel-btn" type="button"></button>
      <button onClick={(e) => switchAnime(e)} className="carousel-btn one"type="button"></button>
      <button onClick={(e) => switchAnime(e)} className="carousel-btn two" type="button"></button>
      <button onClick={(e) => switchAnime(e)} className="carousel-btn three" type="button"></button>
      <button onClick={(e) => switchAnime(e)} className="carousel-btn four" type="button"></button>
    </div>
  )
}
