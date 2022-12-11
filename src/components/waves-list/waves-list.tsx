import { useTranslation } from "react-i18next";

import { useStore } from "../../providers/state/state-provider";

import "./waves-list.css";

const WavesList = () => {
  const { t } = useTranslation();

  const metamaskAccount = useStore(state => state.metamaskAccount);
  const totalWavesCount = useStore(state => state.totalWavesCount);

  return (
    <div className="waves-list">
      <div className="flex justify-between font-bold">
        <div className="all-waves-label">
          {t("wavesList.allWaves")}
        </div>
        <div className={`total-waves-container flex align-center ${!metamaskAccount ? "opacity-0-3" : ""}`}>
          {t("wavesList.total")}
          {totalWavesCount ?? "-"}
        </div>
      </div>
    </div>
  );
};

export default WavesList;