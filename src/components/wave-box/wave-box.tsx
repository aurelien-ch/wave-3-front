import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useStore } from "../../providers/state/state-provider";
import { useMetamaskProvider } from "../../providers/metamask-provider";
import WaveButton from "../wave-button/wave-button";

import "./wave-box.css";

const WaveBox = () => {
  const { t } = useTranslation();
  const metamaskProvider = useMetamaskProvider();

  const metamaskAccount = useStore(state => state.metamaskAccount);
  const senderWaves = useStore(state => state.senderWaves);
  const setSenderWaves = useStore(state => state.setSenderWaves);

  useEffect(() => {
    if (metamaskAccount) {
      metamaskProvider.getSenderWaves().then(waves => {
        setSenderWaves(waves!);
      });
    } else {
      setSenderWaves(undefined);
    }
  }, [metamaskAccount, metamaskProvider, setSenderWaves]);

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
            <div className={`user-total-waves-label ${!metamaskAccount ? "opacity-0-2" : ""}`}>
              {t("waveBox.yourTotalWaves")}
              <span className="font-bold">
                {senderWaves ?? "-"}
              </span>
            </div>
            <WaveButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaveBox;