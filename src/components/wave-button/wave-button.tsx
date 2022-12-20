import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PulseLoader from "react-spinners/PulseLoader";

import { useMetamaskProvider } from "../../providers/metamask-provider";

import "./wave-button.css";

const WaveButton = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });
  const { t } = useTranslation();
  const metamaskProvider = useMetamaskProvider();

  const [loading, setLoading] = useState(false);

  const wave = () => {
    setLoading(true);
    metamaskProvider.wave().finally(() => setLoading(false));
  };

  return (
    <div
      className={`wave-button ${isMobile ? "mobile-wave-button" : ""}`}
      onClick={wave}
    >
      <div className={loading ? "opacity-0" : ""}>
        {t("waveBox.waveAtMe")} 👋
      </div>
      <div className="wave-button-loading-spinner">
        <PulseLoader
          color="#0a7311"
          loading={loading}
        />
      </div>
    </div>
  );
};

export default WaveButton;