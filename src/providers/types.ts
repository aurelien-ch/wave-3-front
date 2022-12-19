import { State } from "./state/state-provider";

export const WAVE_LIST_LIMIT = 3;

export type SetState = ((partial: State | Partial<State> | ((state: State) => State | Partial<State>), replace?: boolean | undefined) => void);

export type ModalTemplate = {
  show: boolean,
  unclosable?: boolean,
  title?: string | null,
  content?: string[],
  buttonTitle?: string,
  buttonFunction?: Function,
}

export type Wave = {
  waverAddr: string,
  timestamp: number,
}

export type TopWaver = {
  addr: string,
  wavesCount: number,
  lastWaveTimestamp: number,
}
