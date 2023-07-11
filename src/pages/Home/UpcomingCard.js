import { Link } from 'react-router-dom'
import filterTitle from '../../helpers/filterTitle'
import styles from '../../styles/home/upcoming/UpcomingCard.module.css'
import limitCharacters from '../../helpers/limitCharacters'

export default function UpcomingCard(props) {

  return (
    <div className={styles.card}>
      <Link className={styles.anchorContainer} to={`/anime/${props.id}`}>
        <img className={styles.image} src={`${props.imageUrl}`} alt="" />
      </Link>
      <a href={`/anime/${props.id}`}>
        <h3 className={styles.title}>{props.englishTitle === null ? limitCharacters(filterTitle(props.title), 20) : limitCharacters(filterTitle(props.englishTitle), 19)}</h3>
      </a>
    </div>
  )
}