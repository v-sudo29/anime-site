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
    setAnimeCards,
    topFilter,
    setTopFilter,
    thereIsMore,
    resetPageCount,
    pageCount,
    resultsType,
    setResultsType,
    fetchAndAdd,
    loadMoreGenresAnime
  }) {

  const runOnce = useRef(false)

  const popularUrl = 'https://api.jikan.moe/v4/top/anime?type=tv&filter=bypopularity'
  const trendingUrl = 'https://api.jikan.moe/v4/top/anime?type=tv&filter=airing'
  // API endpoint broken //
  const upcomingUrl = 'https://api.jikan.moe/v4/top/anime?type=tv&filter=bypopularity'
  const tvUrl = 'https://api.jikan.moe/v4/top/anime?type=tv&order_by=score'
  const movieUrl = 'https://api.jikan.moe/v4/top/anime?type=movie&filter=bypopularity'

  // Fetch and set additional data 
  async function loadMoreAnime() {
    if (topFilter === 'Most Popular') {
      fetchAndAdd(`https://api.jikan.moe/v4/top/anime?type=tv&filter=bypopularity&page=${pageCount}`)
    }
    if (topFilter === 'Top Trending') {
      fetchAndAdd(`https://api.jikan.moe/v4/top/anime?type=tv&filter=airing&page=${pageCount}`)
    }
    if (topFilter === 'Top Upcoming') {
      fetchAndAdd(`https://api.jikan.moe/v4/top/anime?type=tv&filter=bypopularity&page=${pageCount}`)
    }
    if (topFilter === 'Top TV Series') {
      fetchAndAdd(`https://api.jikan.moe/v4/top/anime?type=tv&order_by=score&page=${pageCount}`)
    }
    if (topFilter === 'Top Movies') {
      fetchAndAdd(`https://api.jikan.moe/v4/top/anime?type=movie&filter=bypopularity&page=${pageCount}`)
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
      setResultsType('filter')
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
            next={resultsType === 'filter' ? loadMoreAnime : loadMoreGenresAnime}
            hasMore={thereIsMore}
          >
            {animeCards ? (animeCards.length === 0 ? <NoResults/> : animeCards) : '...Loading'}
          </InfiniteScroll>
        </div>
      </div>
  )
}
