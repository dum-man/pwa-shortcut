"use client";

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { catalogService } from "@/services/catalogService";
import { IContact, ITerminal, IThunkError } from "@/types/app";

export const getContactTypes = createAsyncThunk<
  IContact[],
  string,
  { rejectValue: IThunkError }
>("catalog/getContactTypes", async (lang, { rejectWithValue }) => {
  try {
    const response = await catalogService.getContactTypes(lang);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const getTerminalCoords = createAsyncThunk<
  ITerminal[],
  void,
  { rejectValue: IThunkError }
>("catalog/getTerminalCoords", async (_, { rejectWithValue }) => {
  try {
    const response = await catalogService.getTerminalCoords();
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

interface IState {
  contactTypes: IContact[];
  terminalCoords: ITerminal[];
}

const initialState: IState = {
  contactTypes: [],
  terminalCoords: [],
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        getContactTypes.fulfilled,
        (state, { payload }: PayloadAction<IContact[]>) => {
          state.contactTypes = payload;
        }
      )
      .addCase(
        getTerminalCoords.fulfilled,
        (state, { payload }: PayloadAction<ITerminal[]>) => {
          state.terminalCoords = payload;
        }
      );
  },
});

export const {} = catalogSlice.actions;

export default catalogSlice.reducer;
