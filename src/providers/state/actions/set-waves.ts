import produce from "immer";

import { State } from "../state-provider";
import { SetState, Wave } from "../../types";

export const setWaves = (set: SetState) => (waves: Wave[] | undefined) => {
  set(produce((state: State) => {
    state.waves = waves;
  }));
};