export type PostType = {
  id: string;
  title: string;
  updatedAt?: string;
  user: {
    email: string;
    id: string;
    image: string;
    name: string;
  };
  comments: {
    createdAt?: string;
    id: string;
    postId: string;
    comment: string;
    userId: string;
    user: {
      email: string;
      id: string;
      image: string;
      name: string;
    };
  }[];
};
