import {User} from "./User";
import {Comment} from "./Comment";
import {Post} from "./Post";

export interface Like {
    id: number;
    user: User
    created_at: Date;
}

export interface CommentLike extends Like {
    comment: Comment;
}

export interface PostLike extends Like {
    post: Post;
}
