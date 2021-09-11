export type User = {
    id: number;
    username: string;
    userImage: string;
    userKarma: number;
  };
  
 export type Post = {
    id: number;
    user: User;
    date: Date;
    postText: string;
  };
  