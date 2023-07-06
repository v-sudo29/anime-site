import React, { useState, useEffect } from 'react'
import LoaderAnimation from '../../components/LoaderAnimation'

export default function Stats({styles, character}) {
  const [stats, setStats] = useState(null)

  function splitAbout(aboutInfo) {
    let birthday = null
    let age = null
    let height = null
    let weight = null
    let factOne = null
    let factTwo = null
    
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
      height = aboutInfo.split('Height: ')[1].split('\n')[0]

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

      // Extract two facts into objects
      if (facts.length > 0) {

        if (facts.length === 1) {
          factOne = {}
          const splitOne = facts[0].split(': ')
          factOne[splitOne[0]] = splitOne[1]
          return
        } else if (facts.length > 1) {
          factOne = {}
          factTwo = {}
          const splitOne = facts[0].split(': ')
          const splitTwo = facts[1].split(': ')

          factOne[splitOne[0]] = splitOne[1]
          factTwo[splitTwo[0]] = splitTwo[1]
        }
      }
    }
    return {
      birthday, age, height, weight, factOne, factTwo
    }
  }

  useEffect(() => {
    if (character) {
      setStats(splitAbout(character['about']))
    }
  }, [character])

  return (
    <>
    {stats ? 
      <div className={styles.statsContainer}>
        <div className={styles.age}>Age <div>{stats.age ? stats.age : '-'}</div> </div>
        <div className={styles.birthday}>Birthday <div>{stats.birthday ? stats.birthday : '-'}</div> </div>
        <div className={styles.height}>Height <div>{stats.height ? stats.height : '-'}</div> </div>
        <div className={styles.weight}>Weight <div>{stats.weight ? stats.weight : '-'}</div> </div>

        {/* Display one fact if only one fact exists */}
        {stats.factOne && !stats.factTwo ?
          <div className={styles.factOne}>{Object.keys(stats.factOne)}<div>{stats.factOne(Object.keys(stats.factOne))}</div></div>
        : null}
        
        {/* Display two facts if two facts exist */}
        {stats.factOne && stats.factTwo ? 
        <>
          <div className={styles.factOne}>{Object.keys(stats.factOne)}<div>{stats.factOne[Object.keys(stats.factOne)]}</div></div>
          <div className={styles.factTwo}>{Object.keys(stats.factTwo)}<div>{stats.factTwo[Object.keys(stats.factTwo)]}</div></div>
        </>
        : null}
      </div>
      
    : <LoaderAnimation/>}
    </>
  )
}