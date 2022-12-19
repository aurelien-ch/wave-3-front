import produce from "immer";

import { State } from "../state-provider";
import { SetState, ModalTemplate } from "../../types";

export const setModal = (set: SetState) => (modal: ModalTemplate) => {
  set(produce((state: State) => {
    if (modal.show) {
      state.modal = modal;
    } else {
      state.modal = { show: false };
    }
  }));
};