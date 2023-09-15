import React, { useState, useEffect } from 'react'

export default function Biography({styles, character}) {
  const [biography, setBiography] = useState(null)

  function extractBiography(biography) {
    if (!biography) return null
    const filteredBio = biography.split('\n')

      .filter(string => (string.includes('.')))
      .filter(string => string.length > 30)
      .filter(string => !string.includes('Dislikes:'))
      .filter(string => !string.includes('Famous Quote:'))
      .filter(string => !string.includes('Age:'))
      .join('\n\n')

    return filteredBio
  }

  useEffect(() => {
    if (character) setBiography(extractBiography(character.about))
  }, [character])

  return (
    <div className={styles.biographyContainer}>
        <h2 className={styles.sectionTitle}>Biography</h2>
        <p className={styles.biography}>
          {biography ? biography : 'No biography available.'}
        </p>  
    </div>
  )
}