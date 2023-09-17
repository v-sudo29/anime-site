export interface ProducerResponse {
  data: ProducerData;
}

export interface ProducerData {
  mal_id:      number;
  url:         string;
  titles:      Title[];
  images:      Images;
  favorites:   number;
  established: Date;
  about:       null;
  count:       number;
}

export interface Images {
  jpg: Jpg;
}

export interface Jpg {
  image_url: string;
}

export interface Title {
  type:  string;
  title: string;
}