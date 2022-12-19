import create from "zustand";

import { setMetamaskAccount } from "./actions/set-metamask-account";
import { setModal } from "./actions/set-modal";
import { setSenderWavesCount } from "./actions/set-sender-waves-count";
import { setTotalWavesCount } from "./actions/set-total-waves-count";
import { setOffset } from "./actions/set-offset";
import { setLimit } from "./actions/set-limit";
import { setWaves } from "./actions/set-waves";
import { setTopWavers } from "./actions/set-top-wavers";

import { SetState, WAVE_LIST_LIMIT, ModalTemplate, Wave, TopWaver } from "../types";

export type State = {
  // Metamask Account
  metamaskAccount: string | undefined,
  setMetamaskAccount: (account: string | undefined) => void,
  // Modal
  modal: ModalTemplate,
  setModal: (modal: ModalTemplate) => void,
  // Waves Counts
  senderWavesCount: number | undefined,
  setSenderWavesCount: (wavesCount: number | undefined) => void,
  totalWavesCount: number | undefined,
  setTotalWavesCount: (wavesCount: number | undefined) => void,
  // Waves
  offset: number,
  setOffset: (offset: number) => void,
  limit: number,
  setLimit: (limit: number) => void,
  waves: Wave[] | undefined,
  setWaves: (waves: Wave[] | undefined) => void,
  // Top wavers
  topWavers: TopWaver[] | undefined,
  setTopWavers: (topWavers: TopWaver[] | undefined) => void,
}

export const initialState = ((set: SetState) => ({
  // Metamask Account
  metamaskAccount: undefined,
  setMetamaskAccount: (account: string | undefined) => setMetamaskAccount(set)(account),
  // Modal
  modal: {} as ModalTemplate,
  setModal: (modal: ModalTemplate) => setModal(set)(modal),
  // Waves Counts
  senderWavesCount: undefined,
  setSenderWavesCount: (wavesCount: number | undefined) => setSenderWavesCount(set)(wavesCount),
  totalWavesCount: undefined,
  setTotalWavesCount: (wavesCount: number | undefined) => setTotalWavesCount(set)(wavesCount),
  // Waves
  offset: 0,
  setOffset: (offset: number) => setOffset(set)(offset),
  limit: WAVE_LIST_LIMIT,
  setLimit: (limit: number) => setLimit(set)(limit),
  waves: undefined,
  setWaves: (waves: Wave[] | undefined) => setWaves(set)(waves),
  // Top wavers
  topWavers: undefined,
  setTopWavers: (topWavers: TopWaver[] | undefined) => setTopWavers(set)(topWavers),
}));

export const useStore = create<State>((set) => initialState(set));