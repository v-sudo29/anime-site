import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import styles from '../../styles/character-detail/CharacterDetail.module.css'
import HeroContent from './HeroContent'
import Stats from './Stats'
import VoiceActors from './VoiceActors'
import LoaderAnimation from '../../components/LoaderAnimation'
import { CharacterDetailData, CharacterDetailResponse } from '../../types/fetchDataTypes/fetchCharacterDetailTypes'
import HeroImage from './HeroImage'
import HeroInfo from './HeroInfo'

export default function CharacterDetail() {
  const params = useParams()
  const [character, setCharacter] = useState<CharacterDetailData | null>(null)

  useEffect(() => {
    if (!character) {
      fetch(`https://api.jikan.moe/v4/characters/${params.id}/full`)
        .then(res => res.json())
        .then((data: CharacterDetailResponse )=> {
          setCharacter(data.data)
          document.title = `${data.data['name']}`
        })
    }
  }, [character, params.id])

  if (character) {
    return (
      <div className={styles.content}>
        <div className={styles.leftContainer}>
          <div className={styles.imageAndStatsContainer}>
            <HeroImage character={character}/>
            <Stats character={character}/>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <HeroInfo character={character}/>
        </div>
        {/* <HeroContent styles={styles} character={character}/>
        <Stats styles={styles} character={character}/>
        <VoiceActors styles={styles} character={character}/> */}
      </div>
    )
  } else return <LoaderAnimation/>
}
