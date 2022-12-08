import { useTranslation } from "react-i18next";

import { useMetamaskProvider } from "../../providers/metamask-provider";

import "./wave-box.css";

const WaveBox = () => {
  const { t } = useTranslation();

  const metamaskProvider = useMetamaskProvider();
  const userTotalWaves = 12;

  return (
    <div className="flex justify-center">
      <div className="wave-box flex">
        <div style={{ flex: 2.5 }}>
          <div className="first-wave-headline margin-bottom-10">
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
          <div style={{ marginRight: 5 }}>
            {t("yourTotalWaves")}
            <span className="font-bold">
              {userTotalWaves}
            </span>
          </div>
          <div
            className="wave-at-me-button"
            onClick={metamaskProvider.wave}
          >
            {t("waveAtMe")} 👋
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaveBox;