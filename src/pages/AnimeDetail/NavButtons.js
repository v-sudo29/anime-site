import React from 'react'

export default function NavButtons({styles}) {
  return (
    <div className={styles.navBtnsContainer}>
      <button className={styles.navBtn}>Overview</button>
      <button className={styles.navBtn}>Characters</button>
      <button className={styles.navBtn}>Related Anime</button>
      <button className={styles.navBtn}>Studio & Producers</button>
      <button className={styles.navBtn}>News</button>
    </div>
  )
}
