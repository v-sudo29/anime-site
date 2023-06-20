import { Link } from 'react-router-dom'
import filterTitle from "../../helpers/filterTitle"
import limitCharacters from '../../helpers/limitCharacters'
import ReadMoreBtn from '../../components/ReadMoreBtn'
import styles from '../../styles/home/trending/TrendingCard.module.css'

export default function TrendingCard({anime}) {
  return (
    <div className={styles.slide}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <Link to={`/anime/${anime['mal_id']}`}>
            <img className={styles.image} src={anime['images']['jpg']['large_image_url']} alt="" />
          </Link>
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{anime['title_english'] === null ? filterTitle(anime['title']) : filterTitle(anime['title_english'])}</h3>
          <p className={styles.synopsis}>{limitCharacters(anime['synopsis'])}</p>
          <ReadMoreBtn/>
        </div>
      </div> 
    </div>
  )
}