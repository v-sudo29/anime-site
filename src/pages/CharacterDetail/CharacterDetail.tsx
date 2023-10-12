import React, {useState, useEffect} from 'react'
import styles from '../../styles/character-detail/CharacterDetail.module.css'
import Stats from './Stats'
import VoiceActors from './VoiceActors'
import LoaderAnimation from '../../components/LoaderAnimation'
import HeroImage from './HeroImage'
import HeroInfo from './HeroInfo'
import Biography from './Biography'
import CharacterName from './CharacterName'
import CharacterDetailsButton from './CharacterDetailsButton'
import DetailsModal from './DetailsModal'
import { CharacterDetailData, CharacterDetailResponse } from '../../types/fetchDataTypes/fetchCharacterDetailTypes'
import { useMobile } from '../../context/mobileContext'
import { useParams } from 'react-router-dom'

const CharacterDetail = () => {
  const params = useParams()
  const [character, setCharacter] = useState<CharacterDetailData | null>(null)
  const [isModalShown, setIsModalShown] = useState(false)
  const { isDetailMobile, isTwoColumn } = useMobile()

  // On first render, fetch data
  useEffect(() => {
    if (!character) {
      fetch(`https://api.jikan.moe/v4/characters/${params.id}/full`)
        .then(res => res.json())
        .then((data: CharacterDetailResponse )=> {
          setCharacter(data.data)
          document.title = `${data.data['name']}`
        })
        .catch(err => console.log(err))
    }
  }, [character, params.id])

  if (character) {
    return (
      <div className={styles.content}>

        {/* OVERLAY */}
        {(isDetailMobile && isModalShown) && <div className={styles.overlay}></div>}
        
        {/* BREAKPOINT for DESKTOP <= 800px */}
        {isDetailMobile && (
          <>
            <div className={styles.imageAndTitleAndDetailsContainer}>
              <HeroImage character={character}/>
              <div className={styles.titleAndDetailsContainer}>
                <CharacterName character={character}/>
                <CharacterDetailsButton setIsModalShown={setIsModalShown}/>
              </div>
            </div>
            <DetailsModal
              character={character}
              isModalShown={isModalShown}
              setIsModalShown={setIsModalShown}
            />
            <div className={styles.biographyContainer}>
              <Biography character={character}/>
            </div>
            <div>
              <VoiceActors
                character={character}
                isTwoColumn={isTwoColumn}
              />
            </div>
          </>
        )}

        {/* BREAKPOINT for DESKTOP >= 801px */}
        {!isDetailMobile && (
          <>
            <div className={styles.leftContainer}>
              <div className={styles.imageAndStatsContainer}>
                <HeroImage character={character}/>
                <Stats character={character}/>
              </div>
            </div>
            <div className={styles.rightContainer}>
              <HeroInfo character={character}/>
              <VoiceActors
                character={character}
                isTwoColumn={isTwoColumn}
              />
            </div>
          </>
        )}
      </div>
    )
  } else return <LoaderAnimation/>
}

export default CharacterDetail