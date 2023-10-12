import React from 'react'
import Stats from './Stats'
import { CharacterDetailData } from '../../types/fetchDataTypes/fetchCharacterDetailTypes'

interface DetailsModalProps {
  character: CharacterDetailData
  isModalShown?: boolean
  setIsModalShown?: React.Dispatch<React.SetStateAction<boolean>>
}

const DetailsModal = ({ character, isModalShown, setIsModalShown } : DetailsModalProps) => {
  return (
    <Stats
      character={character}
      isModalShown={isModalShown}
      setIsModalShown={setIsModalShown}
    />
  )
}

export default DetailsModal