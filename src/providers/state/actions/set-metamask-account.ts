import produce from "immer";

import { State } from "../state-provider";

export const setMetamaskAccount = (set: any) => (account: string | undefined) => {
  set(produce((state: State) => {
    state.metamaskAccount = account;
  }));
};