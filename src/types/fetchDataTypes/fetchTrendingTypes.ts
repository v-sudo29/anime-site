export interface TrendingResponse {
  pagination: Pagination;
  data:       TrendingDatum[];
}

export interface TrendingDatum {
  mal_id:          number;
  url:             string;
  images:          { [key: string]: Image };
  trailer:         Trailer;
  approved:        boolean;
  titles:          Title[];
  title:           string;
  title_english:   string;
  title_japanese:  string;
  title_synonyms:  string[];
  type:            string;
  source:          string;
  episodes:        number | null;
  status:          string;
  airing:          boolean;
  aired:           Aired;
  duration:        string;
  rating:          string;
  score:           number;
  scored_by:       number;
  rank:            number;
  popularity:      number;
  members:         number;
  favorites:       number;
  synopsis:        string;
  background:      null | string;
  season:          null | string;
  year:            number | null;
  broadcast:       Broadcast;
  producers:       Demographic[];
  licensors:       Demographic[];
  studios:         Demographic[];
  genres:          Demographic[];
  explicit_genres: any[];
  themes:          Demographic[];
  demographics:    Demographic[];
}

export interface Aired {
  from:   Date;
  to:     Date | null;
  prop:   Prop;
  string: string;
}

export interface Prop {
  from: From;
  to:   From;
}

export interface From {
  day:   number | null;
  month: number | null;
  year:  number | null;
}

export interface Broadcast {
  day:      null | string;
  time:     null | string;
  timezone: null | string;
  string:   null | string;
}

export interface Demographic {
  mal_id: number;
  type:   DemographicType;
  name:   string;
  url:    string;
}

export enum DemographicType {
  Anime = "anime",
}

export interface Image {
  image_url:       string;
  small_image_url: string;
  large_image_url: string;
}

export interface Title {
  type:  TitleType;
  title: string;
}

export enum TitleType {
  Default = "Default",
  English = "English",
  Japanese = "Japanese",
  Synonym = "Synonym",
}

export interface Trailer {
  youtube_id: string;
  url:        string;
  embed_url:  string;
  images:     Images;
}

export interface Images {
  image_url:         string;
  small_image_url:   string;
  medium_image_url:  string;
  large_image_url:   string;
  maximum_image_url: string;
}

export interface Pagination {
  last_visible_page: number;
  has_next_page:     boolean;
  current_page:      number;
  items:             Items;
}

export interface Items {
  count:    number;
  total:    number;
  per_page: number;
}