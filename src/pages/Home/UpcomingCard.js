import { Link } from 'react-router-dom'
import filterTitle from '../../helpers/filterTitle'
import styles from '../../styles/home/upcoming/UpcomingCard.module.css'

export default function UpcomingCard(props) {

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Link className={styles.imageLink} to={`/anime/${props.id}`}>
          <img className={styles.image} src={`${props.imageUrl}`} alt="" />
        </Link>
      </div>
      <div className={styles.textAndTitle}>
        <h3 className={styles.title}>{props.englishTitle === null ? filterTitle(props.title) : filterTitle(props.englishTitle)}</h3>
      </div>
    </div>
  )
}