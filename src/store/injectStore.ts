import { Store } from "@reduxjs/toolkit";

export let $store: Store;

export const injectStore = (_store: Store) => {
  $store = _store;
};
