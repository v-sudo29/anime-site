import { Link } from 'react-router-dom'
import filterTitle from "../helpers/filterTitle"
import limitCharacters from '../helpers/limitCharacters'
import arrowIcon from '../assets/arrow-icon.png'

export default function TrendingCard({anime}) {
  return (
    <div className='slide'>
      <div className='trending-card'>
        <div className='trending-img-container'>
          <Link to={`/anime/${anime['mal_id']}`}>
            <img className='trending-img' src={anime['images']['jpg']['large_image_url']} alt="" />
          </Link>
        </div>
        <div className='trending-info'>
          <h3 className='trending-title'>{anime['title_english'] === null ? filterTitle(anime['title']) : filterTitle(anime['title_english'])}</h3>
          <p className='trending-synopsis'>{limitCharacters(anime['synopsis'])}</p>
          <div className='read-more-link-container'>
            <Link className='read-more-link'>
              Read More
              <img src={arrowIcon} alt="" />
            </Link>
          </div>
        </div>
      </div> 
    </div>
  )
}