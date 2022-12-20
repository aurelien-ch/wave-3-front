import { useMediaQuery } from "react-responsive";

import { useStore } from "./providers/state/state-provider";

import BasicModal from "./components/modals/basic-modal/basic-modal";
import Header from "./components/header/header";
import WaveBox from "./components/wave-box/wave-box";
import HowToUse from "./components/how-to-use/how-to-use";
import WavesList from "./components/waves-list/waves-list";
import TopWavers from "./components/top-wavers/top-wavers";

import "./app.css";

const App = () => {
  const isMobileOrTablet = useMediaQuery({ query: "(max-width: 1340px)" });

  const modal = useStore(state => state.modal);
  const setModal = useStore(state => state.setModal);

  return (
    <div>
      <BasicModal
        modal={modal}
        setModal={setModal}
      />
      <div className="app-container">
        <Header />
        <div className={`row-container flex ${isMobileOrTablet ? "flex-columns" : ""}`}>
          <WaveBox />
          <HowToUse />
        </div>
        <div className={`row-container flex ${isMobileOrTablet ? "flex-columns" : ""}`}>
          <WavesList />
          <TopWavers />
        </div>
      </div>
    </div>
  );
};

export default App;