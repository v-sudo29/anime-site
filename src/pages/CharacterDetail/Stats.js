import React, { useState, useEffect } from 'react'

export default function Stats({styles, character}) {
  const [stats, setStats] = useState(null)

  function splitAbout(aboutInfo) {
    let birthday = null
    let age = null
    let height = null
    let weight = null
    let factOne = null
    let factTwo = null

    // Handle null
    if (!aboutInfo) {
      return {
        birthday: birthday, 
        age: age, 
        height: height, 
        weight: weight, 
        factOne: factOne, 
        factTwo: factTwo
      }
    }

    // Extract birthday
    if (aboutInfo.includes('Birthday')) {
      birthday = aboutInfo.split('Birthday: ')[1].split('\n')[0].split(',')[0]
    } else if (aboutInfo.includes('Birthdate')) {
      birthday = aboutInfo.split('Birthdate: ')[1].split('\n')[0].split(',')[0]
    }
    
    // Extract age
    if (aboutInfo.includes('Age')) {
      age = aboutInfo.split('Age')[1].split('\n')[0].split(': ')[1]

      // Trim age description if longer than 5 characters
      if (age.length > 5 && age.includes('(')) age = age.split(' (')[0]
      if (age.includes(',')) age = age.split(',')[0]
    }

    // Extract height
    if (aboutInfo.includes('Height')) {

      if (aboutInfo.includes('Height: ')) {
        height = aboutInfo.split('Height: ')[1].split('\n')[0]
      } else {
        height = aboutInfo.split('Height ')[1].split('\n')[0]
      }

      if (height.includes('-&gt;')) {
        const index = height.indexOf('-')
        height = height.slice(0, index)
      }
    }

    // Extract weight
    if (aboutInfo.includes('Weight')) {
      weight = aboutInfo.split('Weight: ')[1].split('\n')[0]

      if (weight.includes('-&gt;')) {
        const index = weight.indexOf('-')
        weight = weight.slice(0, index)
      }
    }

    // Extract facts
    if (aboutInfo.includes(':')) {
      
      let facts = aboutInfo.split('\n').filter(string => string !== '')
        .filter(string => string.includes(':'))

      // Check if facts include already extracted info
      if (facts.some(string => string.includes('Age'))) {
        facts = facts.filter(string => !string.includes('Age'))
      }
      if (facts.some(string => string.includes('Birthday'))) {
        facts = facts.filter(string => !string.includes('Birthday'))
      } 
      if (facts.some(string => string.includes('Birthdate'))) {
        facts = facts.filter(string => !string.includes('Birthdate'))
      } 
      if (facts.some(string => string.includes('Height'))) {
        facts = facts.filter(string => !string.includes('Height'))
      } 
      if (facts.some(string => string.includes('Weight'))) {
        facts = facts.filter(string => !string.includes('Weight'))
      }

      // Remove sentences
      if (facts.some(string => string.includes('.'))) {
        facts = facts.filter(string => !string.includes('.'))
      }

      // Remove source
      if (facts.some(string => string.includes('Source'))) {
        facts = facts.filter(string => !string.includes('Source'))
      }

      // Extract two facts into objects
      if (facts.length > 0) {

        if (facts.length === 1) {
          factOne = {}
          let splitOne = facts[0].split(': ')

          factOne[splitOne[0]] = splitOne[1]

        } else if (facts.length > 1) {
          factOne = {}
          factTwo = {}
          const splitOne = facts[0].split(': ')
          const splitTwo = facts[1].split(': ')
    
          const upperCaseOne = splitOne[1].charAt(0).toUpperCase() + splitOne[1].slice(1)
          const upperCaseTwo = splitTwo[1].charAt(0).toUpperCase() + splitTwo[1].slice(1);

          factOne[splitOne[0]] = upperCaseOne
          factTwo[splitTwo[0]] = upperCaseTwo
        }
      }
    }

    return {
      birthday: birthday, 
      age: age, 
      height: height, 
      weight: weight, 
      factOne: factOne, 
      factTwo: factTwo
    }
  }

  useEffect(() => {
    if (character) {
      setStats(splitAbout(character['about']))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character])

  return (
    <>
    {stats &&
      <div className={styles.statsContainer}>
        <div className={styles.age}>Age <span>{stats.age ? stats.age : '-'}</span> </div>
        <div className={styles.birthday}>Birthday <span>{stats.birthday ? stats.birthday : '-'}</span> </div>
        <div className={styles.height}>Height <span>{stats.height ? stats.height : '-'}</span> </div>
        <div className={styles.weight}>Weight <span>{stats.weight ? stats.weight : '-'}</span> </div>

        {/* Display one fact if only one fact exists */}
        {stats.factOne && !stats.factTwo ?
          <div className={styles.factOne}>{Object.keys(stats.factOne)}<span>{stats.factOne[Object.keys(stats.factOne)]}</span></div>
        : null}
        
        {/* Display two facts if two facts exist */}
        {stats.factOne && stats.factTwo ? 
        <>
          <div className={styles.factOne}>{Object.keys(stats.factOne)}<span>{stats.factOne[Object.keys(stats.factOne)]}</span></div>
          <div className={styles.factTwo}>{Object.keys(stats.factTwo)}<span>{stats.factTwo[Object.keys(stats.factTwo)]}</span></div>
        </>
        : null}
      </div>}
    </>
  )
}