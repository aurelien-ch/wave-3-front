import produce from "immer";

import { State } from "../state-provider";

export const setLimit = (set: any) => (limit: number) => {
  set(produce((state: State) => {
    state.limit = limit;
  }));
};