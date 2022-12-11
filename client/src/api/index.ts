import axios from 'axios';
import {Post} from "../interfaces/Post";
import {User} from "../interfaces/User";

const API = axios.create({ baseURL: 'http://localhost:3200' });

API.interceptors.request.use((req) => {
  if (req.headers && localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile') as string)?.token}`;
  }

  return req;
});

/*====================== POSTS ======================*/
export const fetchPosts = async () => await API.get('/posts');
export const fetchPost = async (id: number) => await API.get('/posts/' + id);

export const createPost = async (newPost: Post) => await API.post(`/posts`, newPost);
export const updatePost = async (id: number, updatedPost: Post) => await API.patch(`/posts/${id}`, updatedPost);
export const deletePost = async (id: number) => await API.delete(`/posts/${id}`);

/*====================== USERS ======================*/
export const signUp = async (newUser: User) => await API.post(`/users/signup`, newUser);
export const signIn = async ({ authMethod, password }: { authMethod: string, password: string}) =>
  await API.post(`/users/signin`, { authMethod, password });
