import { useStore } from "./providers/state/state-provider";
import BasicModal from "./components/modals/basic-modal/basic-modal";
import Header from "./components/header/header";
import WaveBox from "./components/wave-box/wave-box";
import HowToUse from "./components/how-to-use/how-to-use";
import WavesList from "./components/waves-list/waves-list";
import TopWavers from "./components/top-wavers/top-wavers";

import "./app.css";

const App = () => {
  const showModal = useStore(state => state.showModal);
  const setShowModal = useStore(state => state.setShowModal);
  const modalTitle = useStore(state => state.modalTitle);
  const modalContent = useStore(state => state.modalContent);

  return (
    <div className="app-container">
      <BasicModal
        open={showModal}
        setOpen={setShowModal}
        title={modalTitle}
        content={modalContent}
      />
      <Header />
      <div className="row-container flex">
        <WaveBox />
        <HowToUse />
      </div>
      <div className="row-container flex">
        <WavesList />
        <TopWavers />
      </div>
    </div>
  );
};

export default App;