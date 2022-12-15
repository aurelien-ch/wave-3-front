import produce from "immer";

import { State } from "../state-provider";
import { SetState } from "../../types";

export const setMetamaskAccount = (set: SetState) => (account: string | undefined) => {
  set(produce((state: State) => {
    state.metamaskAccount = account;
  }));
};