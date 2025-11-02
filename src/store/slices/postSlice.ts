"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { postService } from "@/services/postService";
import { IThunkError } from "@/types/app";
import {
  IGetPostParams,
  IGetPostsParams,
  IGetPostsResponse,
  IPost,
} from "@/types/post";

export const getPosts = createAsyncThunk<
  IGetPostsResponse,
  IGetPostsParams,
  { rejectValue: IThunkError }
>("post/getPosts", async (params, { rejectWithValue }) => {
  try {
    const response = await postService.getPosts(params);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const getPostById = createAsyncThunk<
  IPost,
  IGetPostParams,
  { rejectValue: IThunkError }
>("post/getPostById", async (params, { rejectWithValue }) => {
  try {
    const response = await postService.getPost(params);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const getPostImage = createAsyncThunk<
  string,
  string,
  { rejectValue: IThunkError }
>("post/getPostImage", async (id, { rejectWithValue }) => {
  try {
    const response = await postService.getPostImage(id);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

interface IState {
  posts: IPost[];
  totalPages: number;
}

const initialState: IState = {
  posts: [],
  totalPages: 0,
};

export const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPosts.fulfilled, (state, { payload }) => {
      state.posts = payload.items;
      state.totalPages = payload.totalPages;
    });
  },
});

export const {} = postsSlice.actions;

export default postsSlice.reducer;
