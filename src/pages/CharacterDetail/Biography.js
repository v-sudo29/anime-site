import React, { useState, useEffect } from 'react'

export default function Biography({styles, character}) {
  const [biography, setBiography] = useState(null)
  function extractBiography(biography) {
    const filteredBio = biography.split('\n').filter(string => (string.includes('.'))).join('\n\n')
    return filteredBio
  }

  useEffect(() => {
    if (character) setBiography(extractBiography(character.about))
  }, [character])

  return (
    <div className={styles.biographyContainer}>
      {biography && 
      <>
        <h2 className={styles.sectionTitle}>Biography</h2>
        <p className={styles.biography}>{biography}</p>
      </>
      }
    </div>
  )
}