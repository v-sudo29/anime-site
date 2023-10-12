import { genresMasterList } from '../pages/AnimeList/genresMasterList'

export default function genresToIds(genresArr: string[]): (number | null)[] {
  const arrayCopy = genresArr

  const genreIds = arrayCopy.map(genre => {
    let malId: number | null = null
    const obj = genresMasterList.find(obj => obj.name === genre)
  
    if (obj) malId = obj.mal_id
    
    return malId
  })
  return genreIds
}
