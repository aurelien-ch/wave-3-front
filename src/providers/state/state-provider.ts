import create from "zustand";

import { setMetamaskAccount } from "./actions/set-metamask-account";
import { setShowModal } from "./actions/set-show-modal";
import { setSenderWaves } from "./actions/set-sender-waves";
import { setTotalWaves } from "./actions/set-total-waves";

export type State = {
  // Metamask Account
  metamaskAccount: string | undefined,
  setMetamaskAccount: (account: string) => void,
  // Modal
  showModal: boolean,
  setShowModal: (showModal: boolean, modalTitle: string, modalContent: string[]) => void,
  modalTitle: string,
  modalContent: string[],
  // Waves Counts
  senderWaves: number,
  setSenderWaves: (wavesCount: number) => void,
  totalWaves: number,
  setTotalWaves: (wavesCount: number) => void,
}

export const initialState = ((set: any) => ({
  // Metamask Account
  metamaskAccount: undefined,
  setMetamaskAccount: (account: string) => setMetamaskAccount(set)(account),
  // Modal
  showModal: false,
  setShowModal: (showModal: boolean, modalTitle?: string, modalContent?: string[]) => setShowModal(set)(showModal, modalTitle, modalContent),
  modalTitle: "",
  modalContent: [],
  // Waves Counts
  senderWaves: 0,
  setSenderWaves: (wavesCount: number) => setSenderWaves(set)(wavesCount),
  totalWaves: 0,
  setTotalWaves: (wavesCount: number) => setTotalWaves(set)(wavesCount),
}));

export const useStore = create<State>((set) => initialState(set));