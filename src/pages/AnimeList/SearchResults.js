import React, { useEffect, useRef } from 'react'
import CustomSelect from '../../components/CustomSelect'
import AnimeListCard from '../../components/AnimeListCard'
import NoResults from '../../components/NoResults';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from '../../styles/anime-list/SearchResults.module.css'

export default function SearchResults({
    fetchData, 
    animeCards, 
    animeData, 
    setAnimeData,
    setAnimeCards,
    topFilter,
    setTopFilter,
    thereIsMore,
    setThereIsMore
  }) {

  const pageCount = useRef(2)
  const runOnce = useRef(false)

  const popularUrl = 'https://api.jikan.moe/v4/top/anime?type=tv&filter=bypopularity'
  const trendingUrl = 'https://api.jikan.moe/v4/top/anime?type=tv&filter=airing'
  // API endpoint broken //
  const upcomingUrl = 'https://api.jikan.moe/v4/top/anime?type=tv&filter=bypopularity'
  const tvUrl = 'https://api.jikan.moe/v4/top/anime?type=tv&order_by=score'
  const movieUrl = 'https://api.jikan.moe/v4/top/anime?type=movie&filter=bypopularity'

  // Reset pageCount ref
  function resetPageCount() {
    pageCount.current = 2
  }

  // TODO: Fetch and set additional data
  async function loadMoreAnime() {
    if (topFilter === 'Most Popular') {
      const res = await fetch(`https://api.jikan.moe/v4/top/anime?type=tv&filter=bypopularity&page=${pageCount.current}`)
      const data = await res.json()
      setAnimeData(prevData => [...prevData, ...data.data])
      
      if (!data.pagination['has_next_page']) setThereIsMore(false)
      else setThereIsMore(true)
      pageCount.current += 1
    }
    if (topFilter === 'Top Trending') {
      const res = await fetch(`https://api.jikan.moe/v4/top/anime?type=tv&filter=airing&page=${pageCount.current}`)
      const data = await res.json()
      setAnimeData(prevData => [...prevData, ...data.data])

      if (!data.pagination['has_next_page']) setThereIsMore(false)
      else setThereIsMore(true)
      pageCount.current += 1
    }
    if (topFilter === 'Top Upcoming') {
      const res = await fetch(`https://api.jikan.moe/v4/top/anime?type=tv&filter=bypopularity&page=${pageCount.current}`)
      const data = await res.json()
      setAnimeData(prevData => [...prevData, ...data.data])

      if (!data.pagination['has_next_page']) setThereIsMore(false)
      else setThereIsMore(true)
      pageCount.current += 1
    }
    if (topFilter === 'Top TV Series') {
      const res = await fetch(`https://api.jikan.moe/v4/top/anime?type=tv&order_by=score&page=${pageCount.current}`)
      const data = await res.json()
      setAnimeData(prevData => [...prevData, ...data.data])

      if (!data.pagination['has_next_page']) setThereIsMore(false)
      else setThereIsMore(true)
      pageCount.current += 1
    }
    if (topFilter === 'Top Movies') {
      const res = await fetch(`https://api.jikan.moe/v4/top/anime?type=movie&filter=bypopularity&page=${pageCount.current}`)
      const data = await res.json()
      setAnimeData(prevData => [...prevData, ...data.data])

      if (!data.pagination['has_next_page']) setThereIsMore(false)
      else setThereIsMore(true)
      pageCount.current += 1
    }
  }

  // Update cards when fetch data changes
  useEffect(() => {
    if (animeData) {
      setAnimeCards(animeData.map((anime, index) => {
        return (
          <AnimeListCard 
            key={`${anime['mal_id']}-animeList`}
            anime={anime}
            index={index}
          />
        )
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animeData])

  // Fetch and set new data when topFilter changes
  useEffect(() => {
    if (!runOnce.current) {
      runOnce.current = true
    } 
    else {
      if (topFilter === 'Most Popular') fetchData(popularUrl)
      else if (topFilter === 'Top Trending') fetchData(trendingUrl)
      else if (topFilter === 'Top Upcoming') fetchData(upcomingUrl)
      else if (topFilter === 'Top TV Series') fetchData(tvUrl)
      else if (topFilter === 'Top Movies') fetchData(movieUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topFilter])

  return (
      <div className={styles.container}>
        <div className={styles.titleAndFilter}>
          <h2 className='animeList-title'>Anime List</h2>
          <CustomSelect 
            setTopFilter={setTopFilter}
            resetPageCount={resetPageCount}
          />
        </div>
        <div className={styles.cardsContainer}> 
          <InfiniteScroll 
            dataLength={animeCards ? animeCards.length : null}
            next={loadMoreAnime}
            hasMore={thereIsMore}
          >
            {animeCards ? (animeCards.length === 0 ? <NoResults/> : animeCards) : '...Loading'}
          </InfiniteScroll>
        </div>
      </div>
  )
}
