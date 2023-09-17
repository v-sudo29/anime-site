import { genresMasterList } from '../pages/AnimeList/genresMasterList'

export default function genresToIds(genresArr) {
  const arrayCopy = genresArr
  const genreIds = arrayCopy.map(genre => {
      let malId = null
      genresMasterList.forEach(obj => obj.name === genre ? malId = obj['mal_id'] : null)
      return malId
  })

  return genreIds
}
