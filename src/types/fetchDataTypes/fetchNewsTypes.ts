export interface JSONNewsResponse {
  featured: Featured;
  news:     News[];
}

export interface Featured {
  title: string;
  url:   string;
  image: string;
  date:  string;
}

export interface News {
  title:    string;
  text:     string;
  textHTML: string;
  image:    string;
  comments: number;
  date:     string;
  url:      string;
}
