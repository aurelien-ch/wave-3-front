import produce from "immer";

import { State } from "../state-provider";

export const setSenderWavesCount = (set: any) => (wavesCount: number | undefined) => {
  set(produce((state: State) => {
    state.senderWavesCount = wavesCount;
  }));
};