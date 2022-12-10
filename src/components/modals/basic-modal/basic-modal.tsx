import { useTranslation } from "react-i18next";
import Modal from "react-modal";

import "./basic-modal.css";

interface ModalProps {
  open: boolean,
  setOpen: Function,
  title: string,
  content: string,
}

const BasicModal = ({ open, setOpen, title, content }: ModalProps) => {
  const { t } = useTranslation();

  const style = {
    content: {
      height: "fit-content",
      width: 400,
      maxWidth: "70%",
      backgroundColor: "#022e06",
      border: "none",
      borderRadius: 15,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={open}
      onRequestClose={() => setOpen(false)}
      style={style}
      contentLabel="Example Modal"
    >
      <div className="basic-modal-title font-bold">
        {title}
      </div>
      <div className="basic-modal-content">
        {content
        }</div>
      <div
        className="basic-modal-close-button"
        onClick={() => setOpen(false)}
      >
        {t("modal.close")}
      </div>
    </Modal>
  );
};

export default BasicModal;