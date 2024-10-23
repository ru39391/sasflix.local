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

export type TPostRespData = {
  limit: number;
  posts: TPostData[];
  skip: number;
  total: number;
}

export type TUserData = {
  id: number;
  username: string;
  fullName: string;
}

export type TCommentData = {
  id: number;
  body: string;
  likes: number;
  postId: number;
  user: TUserData;
}

export type TCommentRespData = {
  limit: number;
  comments: TCommentData[];
  skip: number;
  total: number;
}
