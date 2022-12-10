import { useState } from "react";
import { useTranslation } from "react-i18next";
import PropagateLoader from "react-spinners/PropagateLoader";

import { useStore } from "../../providers/state/state-provider";
import { useMetamaskProvider } from "../../providers/metamask-provider";

import "./wave-box.css";

const WaveBox = () => {
  const { t } = useTranslation();

  const metamaskProvider = useMetamaskProvider();
  const metamaskAccount = useStore(state => state.metamaskAccount);

  const [loading, setLoading] = useState(false);

  const wave = () => {
    if (!metamaskAccount) {
      // modal
    } else {
      setLoading(true);
      metamaskProvider.wave().finally(() => setLoading(false));
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="wave-box flex">
          <div style={{ flex: 2.5 }}>
            <div className="first-wave-headline font-bold margin-bottom-10">
              {t("waveBox.waveHeadline1")}
            </div>
            <div className="margin-bottom-10">
              {t("waveBox.waveHeadline2")}
            </div>
            <div>
              {t("waveBox.waveHeadline3")}
            </div>
          </div>
          <div
            style={{ flex: 1 }}
            className="flex flex-columns align-end"
          >
            <div className="user-total-waves-label">
              {t("waveBox.yourTotalWaves")}
              <span className="font-bold">
                12
              </span>
            </div>
            <div
              className="wave-at-me-button"
              onClick={wave}
            >
              <div className={loading ? "opacity-0" : ""}>
                {t("waveBox.waveAtMe")} 👋
              </div>
              <div className="wave-loading-spinner">
                <PropagateLoader
                  color="#0c8314"
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaveBox;