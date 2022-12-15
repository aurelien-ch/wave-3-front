import produce from "immer";

import { State } from "../state-provider";
import { SetState, TopWaver } from "../../types";

export const setTopWavers = (set: SetState) => (topWavers: TopWaver[] | undefined) => {
  set(produce((state: State) => {
    state.topWavers = topWavers;
  }));
};