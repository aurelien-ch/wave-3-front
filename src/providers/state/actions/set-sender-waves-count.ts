import produce from "immer";

import { State } from "../state-provider";
import { SetState } from "../../types";

export const setSenderWavesCount = (set: SetState) => (wavesCount: number | undefined) => {
  set(produce((state: State) => {
    state.senderWavesCount = wavesCount;
  }));
};