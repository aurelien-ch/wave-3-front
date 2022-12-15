import produce from "immer";

import { State } from "../state-provider";
import { SetState } from "../../types";

export const setShowModal = (set: SetState) => (showModal: boolean, modalTitle?: string, modalContent?: string[]) => {
  set(produce((state: State) => {
    state.showModal = showModal;
    modalTitle && (state.modalTitle = modalTitle);
    modalContent && (state.modalContent = modalContent);
  }));
};