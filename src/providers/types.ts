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