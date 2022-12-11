import {useAppSelector} from "../../store/store";
import {PostCard} from "../../components/PostCard/PostCard";

import './Home.css';

export const Home = () => {
    const {posts} = useAppSelector(state => state.posts);

    return (
        <div>
            <h2>Home</h2>
            <div className="posts__container">
                {posts && posts.map(post => (
                    <PostCard key={post.id} {...post} />
                ))}
            </div>
        </div>
    );
}
