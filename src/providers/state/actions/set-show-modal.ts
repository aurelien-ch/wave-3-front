import produce from "immer";

import { State } from "../state-provider";

export const setShowModal = (set: any) => (showModal: boolean, modalTitle?: string, modalContent?: string[]) => {
  set(produce((state: State) => {
    state.showModal = showModal;
    modalTitle && (state.modalTitle = modalTitle);
    modalContent && (state.modalContent = modalContent);
  }));
};