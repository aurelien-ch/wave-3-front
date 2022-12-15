import produce from "immer";

import { State } from "../state-provider";
import { SetState } from "../../types";

export const setOffset = (set: SetState) => (offset: number) => {
  set(produce((state: State) => {
    state.offset = offset;
  }));
};