import { AxiosResponse } from "axios";

import $axios from "@/config/axios";
import {
  IBeneficiaryQuestionnaireResponse,
  IBeneficiaryResponseParams,
} from "@/types/questionnaire";

interface IQuestionnaireService {
  getBeneficiaryQuestionnaire(): Promise<
    AxiosResponse<IBeneficiaryQuestionnaireResponse>
  >;
  saveBeneficiaryResponse(
    params: IBeneficiaryResponseParams
  ): Promise<AxiosResponse<void>>;
}

class QuestionnaireService implements IQuestionnaireService {
  constructor() {}

  getBeneficiaryQuestionnaire() {
    return $axios.get<void, AxiosResponse<IBeneficiaryQuestionnaireResponse>>(
      `/questionnaire/beneficiarQuestionnaire`
    );
  }

  saveBeneficiaryResponse(params: IBeneficiaryResponseParams) {
    return $axios.post<IBeneficiaryResponseParams, AxiosResponse<void>>(
      "/questionnaire/saveQuestionnaireResponse",
      params
    );
  }
}

export const questionnaireService = new QuestionnaireService();
