import create from "zustand";

import { setMetamaskAccount } from "./actions/set-metamask-account";

export type State = {
  metamaskAccount: string | undefined,
  setMetamaskAccount: (account: string) => void,
}

export const initialState = ((set: any) => ({
  metamaskAccount: undefined,
  setMetamaskAccount: (account: string) => setMetamaskAccount(set)(account),

}));

export const useStore = create<State>((set) => initialState(set));