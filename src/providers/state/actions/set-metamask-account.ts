import produce from "immer";

import { State } from "../state-provider";

export const setMetamaskAccount = (set: any) => (account: string) => {
  set(produce((state: State) => {
    state.metamaskAccount = account;
  }));
};