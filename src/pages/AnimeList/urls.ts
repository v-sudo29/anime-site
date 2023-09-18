const url = {
  popular: 'https://api.jikan.moe/v4/top/anime?type=tv&filter=bypopularity',
  trending: 'https://api.jikan.moe/v4/top/anime?type=tv&filter=airing',
  upcoming: 'https://api.jikan.moe/v4/top/anime?filter=upcoming',
  tv: 'https://api.jikan.moe/v4/top/anime?type=tv&order_by=score',
  movie: 'https://api.jikan.moe/v4/top/anime?type=movie&filter=bypopularity',
  popularInfinite: 'https://api.jikan.moe/v4/top/anime?type=tv&filter=bypopularity&page=',
  trendingInfinite: 'https://api.jikan.moe/v4/top/anime?type=tv&filter=airing&page=',
  upcomingInfinite: 'https://api.jikan.moe/v4/top/anime?filter=upcoming&page=',
  tvInfinite: 'https://api.jikan.moe/v4/top/anime?type=tv&order_by=score&page=',
  movieInfinite: 'https://api.jikan.moe/v4/top/anime?type=movie&filter=bypopularity&page='
}

export { url }