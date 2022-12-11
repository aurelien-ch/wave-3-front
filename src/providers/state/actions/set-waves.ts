import produce from "immer";

import { State } from "../state-provider";
import { Wave } from "../../types";

export const setWaves = (set: any) => (waves: Wave[] | undefined) => {
  set(produce((state: State) => {
    state.waves = waves;
  }));
};