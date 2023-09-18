export interface TVResponse {
  pagination: Pagination;
  data:       TVDatum[];
}

export interface TVDatum {
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
  type:            DatumType;
  source:          string;
  episodes:        number;
  status:          Status;
  airing:          boolean;
  aired:           Aired;
  duration:        Duration;
  rating:          Rating;
  score:           number;
  scored_by:       number;
  rank:            number;
  popularity:      number;
  members:         number;
  favorites:       number;
  synopsis:        string;
  background:      null | string;
  season:          Season;
  year:            number;
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
  timezone: Timezone | null;
  string:   string;
}

export enum Timezone {
  AsiaTokyo = "Asia/Tokyo",
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

export enum Duration {
  The22MinPerEp = "22 min per ep",
  The23MinPerEp = "23 min per ep",
  The24MinPerEp = "24 min per ep",
  The25MinPerEp = "25 min per ep",
}

export interface Image {
  image_url:       string;
  small_image_url: string;
  large_image_url: string;
}

export enum Rating {
  PG13Teens13OrOlder = "PG-13 - Teens 13 or older",
  R17ViolenceProfanity = "R - 17+ (violence & profanity)",
  RMildNudity = "R+ - Mild Nudity",
}

export enum Season {
  Fall = "fall",
  Spring = "spring",
  Summer = "summer",
  Winter = "winter",
}

export enum Status {
  CurrentlyAiring = "Currently Airing",
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
  youtube_id: null | string;
  url:        null | string;
  embed_url:  null | string;
  images:     Images;
}

export interface Images {
  image_url:         null | string;
  small_image_url:   null | string;
  medium_image_url:  null | string;
  large_image_url:   null | string;
  maximum_image_url: null | string;
}

export enum DatumType {
  Tv = "TV",
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