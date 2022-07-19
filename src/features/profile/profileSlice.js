import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const POSTSID_URL = "http://localhost:3500/posts/id";
const POSTS_URL = "http://localhost:3500/posts";

const initialState = {
    posts: [],
    status: "idle",
    error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    try {
        const response = await axios.get(POSTS_URL);
        return response.data;
    } catch (err) {
        console.error(err);
    }
});

export const addNewPost = createAsyncThunk(
    "posts/addNewPost",
    async (newPost) => {
        try {
            const response = await axios.post(POSTS_URL, newPost);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
);

export const editPost = createAsyncThunk("posts/editPost", async (editPost) => {
    try {
        const response = await axios.put(POSTS_URL, editPost);
        return response.data;
    } catch (err) {
        console.error(err);
    }
});

export const getPostByID = createAsyncThunk("post/getPostById", async (id) => {
    try {
        const response = await axios.get(POSTSID_URL, {
            params: {
                id: id,
            },
        });
        return response.data;
    } catch (err) {
        console.error(err);
    }
});

export const deletePostByID = createAsyncThunk(
    "post/deletePostByID",
    async (id) => {
        try {
            const response = await axios.delete(POSTS_URL, {
                params: { id: id },
            });
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
);

const profilesSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        profileAdded: {
            reducer(state, action) {
                state.posts.push(action.payload);
            },
            prepare(profile) {
                return {
                    payload: {
                        username: profile.username,
                        avatar: profile.avatar,
                        id: nanoid(),
                        email: profile.email,
                        phone: profile.phone,
                    },
                };
            },
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                action.payload.forEach((item) => {
                    const {
                        _id: id,
                        username,
                        email,
                        phone,
                        avatar: { data },
                    } = item;
                    state.posts.push({ username, id, data, email, phone });
                });
            })
            .addCase(fetchPosts, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                const {
                    _id: id,
                    username,
                    email,
                    phone,
                    avatar: { data },
                } = action.payload;
                state.posts.push({ username, id, data, email, phone });
            })
            .addCase(editPost.fulfilled, (state, action) => {
                state.status = "succeeded";
                const {
                    _id: id,
                    username,
                    email,
                    phone,
                    avatar: { data },
                } = action.payload;
                const updatedPosts = state.posts.filter(
                    (post) => post.id !== id
                );
                updatedPosts.push({ username, id, data, email, phone });
                state.posts = updatedPosts;
            })
            .addCase(getPostByID.fulfilled, (state, action) => {
                const { payload } = action.payload;
                return payload;
            })
            .addCase(deletePostByID.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.posts = [];
                action.payload.forEach((item) => {
                    const {
                        _id: id,
                        username,
                        email,
                        phone,
                        avatar: { data },
                    } = item;
                    state.posts.push({ username, id, data, email, phone });
                });
            })
    },
});

export const selectAllProfile = (state) => state.profiles.posts;
export const clearAllPosts = (state) => state.posts.push([]);
export const { profileAdded } = profilesSlice.actions;
export default profilesSlice.reducer;
