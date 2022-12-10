import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useStore } from "../../providers/state/state-provider";
import { useMetamaskProvider } from "../../providers/metamask-provider";

import "./waves-list.css";

const WavesList = () => {
  const { t } = useTranslation();
  const metamaskProvider = useMetamaskProvider();

  const metamaskAccount = useStore(state => state.metamaskAccount);
  const totalWaves = useStore(state => state.totalWaves);
  const setTotalWaves = useStore(state => state.setTotalWaves);

  useEffect(() => {
    if (metamaskAccount) {
      metamaskProvider.getTotalWaves().then(waves => {
        setTotalWaves(waves!);
      });
    }
  }, [metamaskAccount, metamaskProvider, setTotalWaves]);

  return (
    <div className="waves-list">
      <div className="flex justify-between font-bold">
        <div className="all-waves-label">
          {t("wavesList.allWaves")}
        </div>
        <div className="total-waves-container flex align-center">
          {t("wavesList.total")}
          {totalWaves}
        </div>
      </div>
    </div>
  );
};

export default WavesList;