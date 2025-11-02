import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { adminService } from "@/services/adminService";
import {
  IAuthenticateAdminParams,
  IAuthenticateAdminResponse,
} from "@/types/admin";
import { IThunkError } from "@/types/app";
import {
  ICreatePostParams,
  IEditPostParams,
  IFullPost,
  IUploadPostImageParams,
} from "@/types/post";

export const authAdmin = createAsyncThunk<
  IAuthenticateAdminResponse,
  IAuthenticateAdminParams
>("admin/auth", async (params, { rejectWithValue }) => {
  try {
    const response = await adminService.auth(params);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const getFullPost = createAsyncThunk<
  IFullPost,
  string,
  { rejectValue: IThunkError }
>("admin/getPostFull", async (id, { rejectWithValue }) => {
  try {
    const response = await adminService.getFullPost(id);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const createPost = createAsyncThunk<
  void,
  ICreatePostParams,
  { rejectValue: IThunkError }
>("admin/createPost", async (params, { rejectWithValue }) => {
  try {
    await adminService.createPost(params);
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const editPost = createAsyncThunk<
  void,
  IEditPostParams,
  { rejectValue: IThunkError }
>("admin/editPost", async (post, { rejectWithValue }) => {
  try {
    await adminService.editPost(post);
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const deletePost = createAsyncThunk<
  any,
  string,
  { rejectValue: IThunkError }
>("admin/deletePost", async (id, { rejectWithValue }) => {
  try {
    await adminService.deletePost(id);
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const uploadPostImage = createAsyncThunk<
  void,
  IUploadPostImageParams,
  { rejectValue: IThunkError }
>("admin/uploadPostImage", async (params, { rejectWithValue }) => {
  try {
    await adminService.uploadPostImage(params);
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const deletePostImage = createAsyncThunk<
  any,
  string,
  { rejectValue: IThunkError }
>("admin/deletePostImage", async (imageId, { rejectWithValue }) => {
  try {
    await adminService.deletePostImage(imageId);
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

interface IState {
  isAuth: boolean;
}

const initialState: IState = {
  isAuth: false,
};

export const authSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setIsAdminAuth: (state, { payload: isAuth }: PayloadAction<boolean>) => {
      state.isAuth = isAuth;
    },
    resetAdminState: () => initialState,
  },
  extraReducers(builder) {
    builder.addCase(authAdmin.fulfilled, (state, { payload }) => {
      state.isAuth = true;
      document.cookie = `adminToken=${encodeURIComponent(
        payload.token
      )}; max-age=${payload.expires * 60}; path=/`;
    });
  },
});

export const { setIsAdminAuth } = authSlice.actions;

export default authSlice.reducer;
