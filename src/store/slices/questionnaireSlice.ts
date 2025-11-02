import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { questionnaireService } from "@/services/questionnaireService";
import { IThunkError } from "@/types/app";
import {
  IBeneficiaryQuestion,
  IBeneficiaryQuestionnaireResponse,
  IBeneficiaryResponseParams,
} from "@/types/questionnaire";

export const getBeneficiaryQuestionnaire = createAsyncThunk<
  IBeneficiaryQuestionnaireResponse,
  void,
  { rejectValue: IThunkError }
>(
  "questionnaire/getBeneficiaryQuestionnaire",
  async (_, { rejectWithValue }) => {
    try {
      const response = await questionnaireService.getBeneficiaryQuestionnaire();
      return response.data;
    } catch (error: any) {
      throw rejectWithValue(error);
    }
  }
);

export const saveBeneficiaryResponse = createAsyncThunk<
  void,
  IBeneficiaryResponseParams,
  { rejectValue: IThunkError }
>(
  "questionnaire/saveBeneficiaryResponse",
  async (params, { rejectWithValue }) => {
    try {
      const response = await questionnaireService.saveBeneficiaryResponse(
        params
      );
      return response.data;
    } catch (error: any) {
      throw rejectWithValue(error);
    }
  }
);

interface IState {
  clientId: number;
  creditId: number;
  questions: IBeneficiaryQuestion[];
}

const initialState: IState = {
  clientId: 0,
  creditId: 0,
  questions: [],
};

const questionnaireSlice = createSlice({
  name: "questionnaire",
  initialState,
  reducers: {
    resetQuestionnaireState: () => initialState,
  },
  extraReducers(builder) {
    builder.addCase(
      getBeneficiaryQuestionnaire.fulfilled,
      (
        state,
        { payload }: PayloadAction<IBeneficiaryQuestionnaireResponse>
      ) => {
        state.questions = payload.questions;
        state.clientId = payload.clientId;
        state.creditId = payload.creditId;
      }
    );
  },
});

export const { resetQuestionnaireState } = questionnaireSlice.actions;

export default questionnaireSlice.reducer;
