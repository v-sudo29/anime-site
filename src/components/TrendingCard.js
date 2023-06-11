import { Link } from 'react-router-dom'
import filterTitle from "../helpers/filterTitle"
import limitCharacters from '../helpers/limitCharacters'
import arrowIcon from '../assets/arrow-icon.png'

export default function TrendingCard(props) {
  return (
    <div className='trending-card'>
      <div className='trending-img-container'>
        <Link to={`/anime/${props.id}`}>
          <img className='trending-img' src={`${props.imageUrl}`} alt="" />
        </Link>
      </div>
      <div className='trending-info'>
        <h3 className='trending-title'>{props.englishTitle === null ? filterTitle(props.title) : filterTitle(props.englishTitle)}</h3>
        <p className='trending-synopsis'>{limitCharacters(props.synopsis)}</p>
        <div className='read-more-link-container'>
          <Link className='read-more-link'>
            Read More
            <img src={arrowIcon} alt="" />
          </Link>
        </div>
        <div className='trending-buttons-container'>
          <button className='trending-button trending-one active-trending' type="button"></button>
          <button className='trending-button trending-two' type="button"></button>
          <button className='trending-button trending-three' type="button"></button>
          <button className='trending-button trending-four' type="button"></button>
          <button className='trending-button trending-five' type="button"></button>
        </div>
      </div>
    </div>
  )
}