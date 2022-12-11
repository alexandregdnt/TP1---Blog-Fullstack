import {User} from "./User";
import {CommentLike} from "./Like";

export interface Comment {
    id?: number;
    post_id: number;
    author_id: number;
    content: string;
    created_at?: Date;
    likes?: CommentLike[];
    answers?: Comment[];
    author?: User;
}
