import React from 'react'

export default function NavButtons({styles}) {
  return (
    <div className={styles.navBtnsContainer}>
      <button 
        className={styles.navBtn}
        onClick={() => document.querySelector('.overview').scrollIntoView()} 
        >Overview
      </button>

      <button 
        className={styles.navBtn}
        onClick={() => document.querySelector('.characters').scrollIntoView()}
        >Characters
      </button>

      <button 
        className={styles.navBtn}
        onClick={() => document.querySelector('.relatedAnime').scrollIntoView()}
        >Related Anime
      </button>

      <button 
        className={styles.navBtn}
        onClick={() => document.querySelector('.studioProducers').scrollIntoView()}
        >Studio & Producers
      </button>

      <button 
        className={styles.navBtn}
        onClick={() => document.querySelector('.news').scrollIntoView()}
        >News
      </button>
    </div>
  )
}
