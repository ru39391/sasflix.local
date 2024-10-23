export type TCustomData<T> = {
  [x: string]: T;
}

export type TPostData = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: TCustomData<number>;
  views: number;
  userId: number;
}

export type TRespData = {
  limit: number;
  posts: TPostData[];
  skip: number;
  total: number;
}
