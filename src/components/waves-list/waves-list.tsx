import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useStore } from "../../providers/state/state-provider";
import { useMetamaskProvider } from "../../providers/metamask-provider";

import "./waves-list.css";

const WavesList = () => {
  const { t } = useTranslation();

  const metamaskProvider = useMetamaskProvider();
  const metamaskAccount = useStore(state => state.metamaskAccount);

  const [totalWaves, setTotalWaves] = useState(0);

  useEffect(() => {
    if (metamaskAccount) {
      metamaskProvider.getTotalWaves().then(waves => {
        setTotalWaves(waves!);
      });
    }
  }, [metamaskAccount, metamaskProvider]);

  return (
    <div className="waves-list">
      <div className="all-waves-label flex justify-between">
        {t("allWaves")}
        <div className="flex">
          {t("total")}
          {totalWaves}
        </div>
      </div>
    </div>
  );
};

export default WavesList;