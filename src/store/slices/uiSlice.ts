import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InFocusCalculatorType = "consumer" | "daily";

interface IState {
  inFocusCalculator: InFocusCalculatorType;
}

const initialState: IState = {
  inFocusCalculator: "daily",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setInFocusCalculator: (
      state,
      { payload }: PayloadAction<InFocusCalculatorType>
    ) => {
      state.inFocusCalculator = payload;
    },
  },
  extraReducers(builder) {},
});

export const { setInFocusCalculator } = uiSlice.actions;

export default uiSlice.reducer;
