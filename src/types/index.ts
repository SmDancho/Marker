export interface user {
  _id: string;
  username: string;
  password: string;
  token: string;
  posts?: string[];
  roles: string[];
}
export interface comment {
  _id: string;
  username: string;
  text: string;
}
export interface raiting {
  _id: string;
  userId: string;
  value: number;
}

export interface post {
  _id: string;
  author: string;
  title: string;
  topic: string;
  image: string;
  tags: string[];
  text: string;
  raiting: raiting[];
  authorRaiting: number;
  likes: string[];
  comments: comment[];
  group: string;
}
