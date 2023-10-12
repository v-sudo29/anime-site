import React from 'react'
import Stats from './Stats'
import { AnimeDetailData } from '../../types/fetchDataTypes/fetchAnimeDetailTypes'

interface DetailsModalProps {
  anime: AnimeDetailData
  isModalShown?: boolean
  setIsModalShown: React.Dispatch<React.SetStateAction<boolean>>
}

const DetailsModal = ({ anime, isModalShown, setIsModalShown } : DetailsModalProps) => {
  return (
    <Stats
      anime={anime}
      isModalShown={isModalShown}
      setIsModalShown={setIsModalShown}
    />
  )
}

export default DetailsModal