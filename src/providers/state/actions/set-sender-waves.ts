import produce from "immer";

import { State } from "../state-provider";

export const setSenderWaves = (set: any) => (wavesCount: number) => {
  set(produce((state: State) => {
    state.senderWaves = wavesCount;
  }));
};