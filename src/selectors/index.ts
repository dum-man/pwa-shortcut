import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@/store/store";
import { IUserCreditRatePromo } from "@/types/user";

export const selectContactTypesForSelect = createSelector(
  (state: RootState) => state,
  (state: RootState) =>
    state.catalog.contactTypes.map((contact) => ({
      id: contact.id,
      value: contact.name.toLowerCase(),
      label: contact.name,
    }))
);

export const selectCreditRateForPromo = createSelector(
  (state: RootState) => state,
  (state: RootState): IUserCreditRatePromo | null => {
    const creditRate = state.user.creditRate;

    if (!creditRate) {
      return null;
    }

    return {
      sumMin: creditRate.sumMin,
      sumMax: creditRate.sumMax,
      sumIncrementValue: creditRate.sumIncrementValue,
      sumDefault: creditRate.sumMax,
      daysDefault: creditRate.daysMax,
    };
  }
);
