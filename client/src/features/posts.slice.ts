import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import * as api from '../api';
import {Post} from "../interfaces/Post";

interface PostsState {
    posts: Post[];
    loading: boolean;
    errors: any;
}

const initialState: PostsState = {
    posts: [],
    loading: false,
    errors: null
}

// actions are processes that get data from backend
export const getPosts = createAsyncThunk<Post[]>(
    'posts/getPosts',
    async (_, thunkAPI) => {
        try {
            const { data } = await api.fetchPosts();
            return data.posts;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const createPost = createAsyncThunk<Post, Post>(
    'posts/createPost',
    async (newPost, thunkAPI) => {
        try {
            const { data } = await api.createPost(newPost);
            thunkAPI.dispatch(getPosts());
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


// reducers -> reduce to a specific state -> changes state
export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state: any, action: PayloadAction<Post[]>) => {
            state.posts = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPosts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getPosts.fulfilled, (state: any, action) => {
            state.posts = action.payload;
            state.loading = false;
        });
        builder.addCase(getPosts.rejected, (state, action) => {
            state.loading = false;
            state.errors = action.payload;
        });
    }
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
