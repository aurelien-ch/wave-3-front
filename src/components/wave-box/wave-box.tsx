import { useState } from "react";
import { useTranslation } from "react-i18next";
import PropagateLoader from "react-spinners/PropagateLoader";

import { useMetamaskProvider } from "../../providers/metamask-provider";

import "./wave-box.css";

const WaveBox = () => {
  const { t } = useTranslation();

  const metamaskProvider = useMetamaskProvider();
  const [loading, setLoading] = useState(false);
  const userTotalWaves = 12;

  return (
    <div className="flex justify-center">
      <div className="wave-box flex">
        <div style={{ flex: 2.5 }}>
          <div className="first-wave-headline font-bold margin-bottom-10">
            {t("waveHeadline1")}
          </div>
          <div className="margin-bottom-10">
            {t("waveHeadline2")}
          </div>
          <div>
            {t("waveHeadline3")}
          </div>
        </div>
        <div
          style={{ flex: 1 }}
          className="flex flex-columns align-end"
        >
          <div className="user-total-waves-label">
            {t("yourTotalWaves")}
            <span className="font-bold">
              {userTotalWaves}
            </span>
          </div>
          <div
            className="wave-at-me-button"
            onClick={() => {
              setLoading(true);
              metamaskProvider.wave().finally(() => setLoading(false));
            }}
          >
            <div className={loading ? "opacity-0" : ""}>
              {t("waveAtMe")} 👋
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
  );
};

export default WaveBox;