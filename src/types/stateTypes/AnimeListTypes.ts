import { PopularResponse, PopularDatum } from '../../types/fetchDataTypes/fetchPopularTypes'
import { TrendingResponse, TrendingDatum } from '../../types/fetchDataTypes/fetchTrendingTypes'
import { UpcomingResponse, UpcomingDatum } from '../../types/fetchDataTypes/fetchUpcomingTypes'
import { TVResponse, TVDatum } from '../../types/fetchDataTypes/fetchTvTypes'
import { MovieResponse, MovieDatum } from '../../types/fetchDataTypes/fetchMovieTypes'

export type SearchDataTypes = 
  (PopularDatum | TrendingDatum | UpcomingDatum | TVDatum | MovieDatum)[] |
  null

export type SearchResponseTypes = 
  PopularResponse |
  TrendingResponse |
  UpcomingResponse |
  TVResponse | 
  MovieResponse

export type SingleSearchedAnime = PopularDatum | TrendingDatum | UpcomingDatum | TVDatum | MovieDatum

