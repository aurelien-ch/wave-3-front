import produce from "immer";

import { State } from "../state-provider";

export const setOffset = (set: any) => (offset: number) => {
  set(produce((state: State) => {
    state.offset = offset;
  }));
};