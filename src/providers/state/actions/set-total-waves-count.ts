import produce from "immer";

import { State } from "../state-provider";

export const setTotalWavesCount = (set: any) => (wavesCount: number | undefined) => {
  set(produce((state: State) => {
    state.totalWavesCount = wavesCount;
  }));
};