import { State } from "./state/state-provider";

export type SetState = ((partial: State | Partial<State> | ((state: State) => State | Partial<State>), replace?: boolean | undefined) => void);

export const WAVE_LIST_LIMIT = 3;

export type Wave = {
  waverAddr: string,
  timestamp: number,
}

export type TopWaver = {
  addr: string,
  wavesCount: number,
  lastWaveTimestamp: number,
}
