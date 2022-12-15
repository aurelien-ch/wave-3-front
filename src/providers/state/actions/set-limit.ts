import produce from "immer";

import { State } from "../state-provider";
import { SetState } from "../../types";

export const setLimit = (set: SetState) => (limit: number) => {
  set(produce((state: State) => {
    state.limit = limit;
  }));
};