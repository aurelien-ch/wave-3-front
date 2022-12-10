import produce from "immer";

import { State } from "../state-provider";

export const setSenderWaves = (set: any) => (wavesCount: number | undefined) => {
  set(produce((state: State) => {
    state.senderWaves = wavesCount;
  }));
};