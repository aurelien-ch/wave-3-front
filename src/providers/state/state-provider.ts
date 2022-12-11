import create from "zustand";

import { setMetamaskAccount } from "./actions/set-metamask-account";
import { setShowModal } from "./actions/set-show-modal";
import { setSenderWavesCount } from "./actions/set-sender-waves-count";
import { setTotalWavesCount } from "./actions/set-total-waves-count";

export type State = {
  // Metamask Account
  metamaskAccount: string | undefined,
  setMetamaskAccount: (account: string | undefined) => void,
  // Modal
  showModal: boolean,
  setShowModal: (showModal: boolean, modalTitle: string, modalContent: string[]) => void,
  modalTitle: string,
  modalContent: string[],
  // Waves Counts
  senderWavesCount: number | undefined,
  setSenderWavesCount: (wavesCount: number | undefined) => void,
  totalWavesCount: number | undefined,
  setTotalWavesCount: (wavesCount: number | undefined) => void,
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
  senderWavesCount: undefined,
  setSenderWavesCount: (wavesCount: number | undefined) => setSenderWavesCount(set)(wavesCount),
  totalWavesCount: undefined,
  setTotalWavesCount: (wavesCount: number | undefined) => setTotalWavesCount(set)(wavesCount),
}));

export const useStore = create<State>((set) => initialState(set));