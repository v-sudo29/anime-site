import { Link } from 'react-router-dom'
import filterTitle from "../../helpers/filterTitle"
import limitCharacters from '../../helpers/limitCharacters'
import ReadMoreBtn from '../../components/ReadMoreBtn'
import styles from '../../styles/home/trending/TrendingCard.module.css'

export default function TrendingCard({anime}) {
  const id = anime['mal_id']
  const imgSrc = anime['images']['jpg']['large_image_url']
  const englishTitle = anime['title_english'] && filterTitle(anime['title_english'])
  const defaultTitle = anime['title'] && filterTitle(anime['title']) 

  return (
    <div className={styles.slide}>
      <div className={styles.card}>
        <Link className={styles.anchorContainer} tabIndex={-1} to={`/anime/${id}`}>
          <div className={styles.imageDiv}>
            <img className={styles.image} src={imgSrc} alt=""/>
          </div>
        </Link>
        <div className={styles.info}>
          <h3 className={styles.title}>{englishTitle ?? defaultTitle}</h3>
          <p className={styles.synopsis}>{limitCharacters(anime['synopsis'])}</p>
          <ReadMoreBtn url={`/anime/${id}`}/>
        </div>
      </div> 
    </div>
  )
}