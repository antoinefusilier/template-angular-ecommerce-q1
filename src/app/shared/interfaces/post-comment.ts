export interface PostComment {
    author: string;
    avatar?: string;
    date: string;
    text: string;
    postTitle?: string;
    children?: PostComment[];
}
