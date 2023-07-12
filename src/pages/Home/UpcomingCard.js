import { Link } from 'react-router-dom'
import filterTitle from '../../helpers/filterTitle'
import styles from '../../styles/home/upcoming/UpcomingCard.module.css'
import limitCharacters from '../../helpers/limitCharacters'

export default function UpcomingCard({anime}) {
  const id = anime['mal_id']
  const imgSrc = anime['images']['jpg']['large_image_url']
  const englishTitle= anime['title_english'] && limitCharacters(filterTitle(anime['title_english']), 19)
  const defaultTitle = anime['title'] && limitCharacters(filterTitle(anime['title']), 19)

  return (
    <div className={styles.card}>
      <Link className={styles.anchorContainer} to={`/anime/${id}`}>
        <img className={styles.image} src={imgSrc} alt="" />
      </Link>
      <a href={`/anime/${id}`}>
        <h3 className={styles.title}>{englishTitle ? englishTitle : defaultTitle}</h3>
      </a>
    </div>
  )
}