import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import styles from '../../styles/components/CharacterDetail.module.css'
import HeroContent from './HeroContent'
import Stats from './Stats'
import Biography from './Biography'
import VoiceActors from './VoiceActors'
import LoaderAnimation from '../../components/LoaderAnimation'
import { CharacterDetailData, CharacterDetailResponse } from '../../types/fetchDataTypes/fetchCharacterDetailTypes'

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

  return (
    <>
      {character ?
        <div className={styles.detailPage}>
          {/* <div className={styles.backgroundImg}></div> */}
              <div className={styles.content}>
                  <HeroContent styles={styles} character={character}/>
                  <Stats styles={styles} character={character}/>
                  <Biography styles={styles} character={character}/>
                  <VoiceActors styles={styles} character={character}/>
              </div>
        </div>
      : <LoaderAnimation/>}
    </>
  )
}
