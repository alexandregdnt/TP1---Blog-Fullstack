import {Post as PostType} from "../../interfaces/Post";

import './PostCard.css';
import {NavLink} from "react-router-dom";
export const PostCard = (post: PostType) => {
    return (
        <div className="post__card">
            <h3>{post.title}</h3>
            <p>{post.content.split(" ").slice(0, 15).join(" ")} {post.content.split(" ").length > 15 ? '[...]' : ''}</p>
            <NavLink to={`/post/${post.id}`}>Read more -&gt;</NavLink>
        </div>
    );
};
