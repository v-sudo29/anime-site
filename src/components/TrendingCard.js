import { Link } from 'react-router-dom'
import filterTitle from "../helpers/filterTitle"

export default function TrendingCard(props) {
  return (
    <div className='trending-card'>
      <h3 className='trending-title'>{props.englishTitle === null ? filterTitle(props.title) : filterTitle(props.englishTitle)}</h3>
      <div className='trending-image-container'>
        <Link to={`/anime/${props.id}`}>
          <img className='trending-img' src={`${props.imageUrl}`} alt="" />
        </Link>
      </div>
    </div>
  )
}