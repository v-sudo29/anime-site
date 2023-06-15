import { Link } from 'react-router-dom'
import filterTitle from '../../helpers/filterTitle'

export default function UpcomingCard(props) {

  return (
    <div className='upcoming-card'>
      <div className='upcoming-image-container'>
        <Link to={`/anime/${props.id}`}>
          <img className='upcoming-img' src={`${props.imageUrl}`} alt="" />
        </Link>
      </div>
      <div className='upcoming-text-and-title'>
        <div className='days-left-text'>5 Days Left</div>
        <h3 className='upcoming-title'>{props.englishTitle === null ? filterTitle(props.title) : filterTitle(props.englishTitle)}</h3>
      </div>
    </div>
  )
}