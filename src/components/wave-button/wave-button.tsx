import { useState } from "react";
import { useTranslation } from "react-i18next";
import PulseLoader from "react-spinners/PulseLoader";

import { useStore } from "../../providers/state/state-provider";
import { useMetamaskProvider } from "../../providers/metamask-provider";

import "./wave-button.css";

const WaveButton = () => {
  const { t } = useTranslation();
  const metamaskProvider = useMetamaskProvider();

  const metamaskAccount = useStore(state => state.metamaskAccount);
  const setShowModal = useStore(state => state.setShowModal);

  const [loading, setLoading] = useState(false);

  const wave = () => {
    if (!metamaskAccount) {
      setShowModal(true, t("modal.error"), [t("errors.notConnected1"), t("errors.notConnected2")]);
    } else {
      setLoading(true);
      metamaskProvider.wave().finally(() => setLoading(false));
    }
  };

  return (
    <div
      className="wave-button"
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