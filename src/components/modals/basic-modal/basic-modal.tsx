import { useTranslation } from "react-i18next";
import Modal from "react-modal";

import { ModalTemplate } from "../../../providers/types";
import "./basic-modal.css";

interface ModalProps {
  modal: ModalTemplate,
  setModal: Function,
}

const BasicModal = ({ modal, setModal }: ModalProps) => {
  const { t } = useTranslation();

  const style = {
    content: {
      height: "fit-content",
      width: 400,
      maxWidth: "70%",
      backgroundColor: "#022906",
      border: "none",
      borderRadius: 15,
      padding: "25px 35px",
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
      isOpen={modal.show}
      onRequestClose={() => modal.unclosable ? null : setModal({ ...modal, show: false })}
      style={style}
    >
      <div className="basic-modal-title font-bold">
        {modal.title}
      </div>
      <div className="basic-modal-content">
        {
          modal.content?.map((line: string, index: number) => (
            <div
              key={index}
              className={modal.content && index < modal.content.length - 1 ? "margin-bottom-10" : ""}
            >
              {line}
            </div>
          ))
        }
      </div>
      <div
        className="basic-modal-close-button"
        onClick={modal.buttonFunction as React.MouseEventHandler<HTMLDivElement> ?? (() => setModal({ ...modal, show: false }))}
      >
        {modal.buttonTitle ?? t("modal.close")}
      </div>
    </Modal >
  );
};

export default BasicModal;