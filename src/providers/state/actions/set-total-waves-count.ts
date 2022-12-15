import produce from "immer";

import { State } from "../state-provider";
import { SetState } from "../../types";

export const setTotalWavesCount = (set: SetState) => (wavesCount: number | undefined) => {
  set(produce((state: State) => {
    state.totalWavesCount = wavesCount;
  }));
};