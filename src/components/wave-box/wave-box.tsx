import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";

import { useStore } from "../../providers/state/state-provider";
import WaveButton from "../wave-button/wave-button";

import "./wave-box.css";

const WaveBox = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });
  const { t } = useTranslation();

  const metamaskAccount = useStore(state => state.metamaskAccount);
  const senderWavesCount = useStore(state => state.senderWavesCount);

  return (
    <div className={`wave-box flex ${isMobile ? "flex-columns" : ""}`}>
      <div className="flex flex-1 flex-columns justify-center">
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
      <div className={`flex flex-columns justify-center ${isMobile ? "margin-top-30" : "margin-left-30"}`}>
        <div className={`user-total-waves-label ${!metamaskAccount ? "opacity-0-2" : ""}`}>
          {t("waveBox.yourTotalWaves")}
          <span className="font-bold">
            {senderWavesCount ?? "-"}
          </span>
        </div>
        <WaveButton />
      </div>
    </div>
  );
};

export default WaveBox;