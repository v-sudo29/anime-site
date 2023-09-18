export interface MovieResponse {
  pagination: Pagination;
  data:       MovieDatum[];
}

export interface MovieDatum {
  mal_id:          number;
  url:             string;
  images:          { [key: string]: Image };
  trailer:         Trailer;
  approved:        boolean;
  titles:          Title[];
  title:           string;
  title_english:   null | string;
  title_japanese:  string;
  title_synonyms:  string[];
  type:            DatumType;
  source:          Source;
  episodes:        number;
  status:          Status;
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
  season:          null;
  year:            null;
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
  to:     null;
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
  day:      null;
  time:     null;
  timezone: null;
  string:   null;
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

export enum Source {
  LightNovel = "Light novel",
  Manga = "Manga",
  Novel = "Novel",
  Original = "Original",
}

export enum Status {
  FinishedAiring = "Finished Airing",
}

export interface Title {
  type:  TitleType;
  title: string;
}

export enum TitleType {
  Default = "Default",
  English = "English",
  French = "French",
  German = "German",
  Japanese = "Japanese",
  Spanish = "Spanish",
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

export enum DatumType {
  Movie = "Movie",
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
