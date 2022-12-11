import {Post} from "./Post";
import {Comment} from "./Comment";
import {CommentLike, PostLike} from "./Like";

export interface User {
    id?: number;
    username: string;
    email: string;
    phone?: string;
    bio?: string;
    roles?: Role[];
    password?: string;
    hashed_password?: string;
    firstname: string;
    lastname: string;
    date_of_birth?: string;
    avatar_url?: string;
    created_at?: Date;
    updated_at?: Date;
    followers?: User[];
    followings?: User[];
    posts?: Post[];
    comments?: Comment[];
    postLikes?: PostLike[];
    commentLikes?: CommentLike[];
}

export interface Role {
    id: number;
    name: string;
    description?: string;
}
