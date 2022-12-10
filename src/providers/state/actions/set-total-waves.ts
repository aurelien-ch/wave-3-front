import produce from "immer";

import { State } from "../state-provider";

export const setTotalWaves = (set: any) => (wavesCount: number) => {
  set(produce((state: State) => {
    state.totalWaves = wavesCount;
  }));
};