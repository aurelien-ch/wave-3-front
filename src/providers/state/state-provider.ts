import create from "zustand";

import { setMetamaskAccount } from "./actions/set-metamask-account";
import { setShowModal } from "./actions/set-show-modal";

export type State = {
  metamaskAccount: string | undefined,
  setMetamaskAccount: (account: string) => void,
  showModal: boolean,
  setShowModal: (showModal: boolean, modalTitle: string, modalContent: string[]) => void,
  modalTitle: string,
  modalContent: string[],
}

export const initialState = ((set: any) => ({
  metamaskAccount: undefined,
  setMetamaskAccount: (account: string) => setMetamaskAccount(set)(account),
  showModal: false,
  setShowModal: (showModal: boolean, modalTitle?: string, modalContent?: string[]) => setShowModal(set)(showModal, modalTitle, modalContent),
  modalTitle: "",
  modalContent: [],
}));

export const useStore = create<State>((set) => initialState(set));