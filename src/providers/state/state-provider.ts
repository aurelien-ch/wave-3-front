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
  senderWaves: number | undefined,
  setSenderWaves: (wavesCount: number | undefined) => void,
  totalWaves: number | undefined,
  setTotalWaves: (wavesCount: number | undefined) => void,
}

export const initialState = ((set: any) => ({
  // Metamask Account
  metamaskAccount: undefined,
  setMetamaskAccount: (account: string | undefined) => setMetamaskAccount(set)(account),
  // Modal
  showModal: false,
  setShowModal: (showModal: boolean, modalTitle?: string, modalContent?: string[]) => setShowModal(set)(showModal, modalTitle, modalContent),
  modalTitle: "",
  modalContent: [],
  // Waves Counts
  senderWaves: undefined,
  setSenderWaves: (wavesCount: number | undefined) => setSenderWaves(set)(wavesCount),
  totalWaves: undefined,
  setTotalWaves: (wavesCount: number | undefined) => setTotalWaves(set)(wavesCount),
}));

export const useStore = create<State>((set) => initialState(set));