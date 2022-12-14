import produce from "immer";

import { State } from "../state-provider";
import { TopWaver } from "../../types";

export const setTopWavers = (set: any) => (topWavers: TopWaver[] | undefined) => {
  set(produce((state: State) => {
    state.topWavers = topWavers;
  }));
};