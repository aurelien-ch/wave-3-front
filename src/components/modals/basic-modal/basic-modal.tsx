import Modal from "react-modal";

import "./basic-modal.css";

interface ModalProps {
  open: boolean,
  setOpen: Function,
  title: string,
  content: string,
}

const BasicModal = ({ open, setOpen, title, content }: ModalProps) => {
  const style = {
    content: {
      backgroundColor: "#043508",
      border: "none",
      borderRadius: 15,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
  };

  return (
    <Modal
      ariaHideApp={false}
      // className="basic-modal"
      isOpen={open}
      // onAfterOpen={afterOpenModal}
      onRequestClose={() => setOpen(false)}
      style={style}
      contentLabel="Example Modal"
    >
      <div className="basic-modal-title font-bold">
        {title}
      </div>
      <button onClick={() => setOpen(false)}>
        close
      </button>
      <div>{content}</div>
    </Modal>
  );
};

export default BasicModal;