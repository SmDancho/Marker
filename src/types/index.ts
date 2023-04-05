export interface user {
  _id: string;
  username: string;
  password: string;
  token: string;
  posts?: Array<string>;
}
