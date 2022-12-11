import {User} from "./User";
import {PostLike} from "./Like";

export interface Post {
    id?: number;
    author_id: number;
    title: string;
    content: string;
    hero_image_url?: string;
    created_at?: Date;
    updated_at?: Date;
    author: User;
    comments?: Comment[];
    likes?: PostLike[];
}
