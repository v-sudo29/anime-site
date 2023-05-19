import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function AnimeDetail() {
  const params = useParams()
  const [anime, setAnime] = useState(null)

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${params.id}`)
    .then(response => response.json())
    .then(data => setAnime(data.data))
  }, [])

  console.log(anime)
  return (
    <div className='anime-detail-container'>
      {(anime 
        ? <div>
            <h1 className='detail-title' >{anime.title}</h1>
            <div className='image-and-facts'>
              <img src={`${anime.images.jpg['large_image_url']}`} alt="" />
              <section className='facts'>
                <div><b>Rank: </b>{anime.rank}</div>
                <div><b>Score: </b>{anime.score}</div>
                <div><b>Rating: </b>{anime.rating}</div>
                <div><b>Genres: </b>{anime.genres.map(genre => genre.name + ' ')}</div>
                <div><b>Studios: </b>{anime.studios.map(studio => studio.name + ' ')}</div>
                <div><b>Year Released: </b>{anime.year}</div>
              </section>
            </div>
            <p className='synopsis'>
              <b>Synopsis: </b>
              <br />
              {anime.synopsis}
            </p>
          </div>
        : <h1>...Loading</h1>
      )}
    </div>
  )
}

export default AnimeDetail