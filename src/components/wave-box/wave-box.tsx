import { useTranslation } from "react-i18next";

import "./wave-box.css";

const WaveBox = () => {
  const { t } = useTranslation();
  const totalWaves = 12;

  return (
    <div className="flex justify-center">
      <div className="wave-box flex">
        <div style={{ flex: 2.5 }}>
          <div className="margin-bottom-10">
            {t("waveHeadline1")}
          </div>
          <div className="margin-bottom-10">
            {t("waveHeadline2")}
          </div>
          <div>
            {t("waveHeadline3")}
          </div>
        </div>
        <div style={{ flex: 1, marginLeft: 25 }}>
          <div>
            {t("yourTotalWaves")}
            <span className="font-bold">
              {totalWaves}
            </span>
          </div>
          <div className="wave-at-me-button">
            {t("waveAtMe")} 👋
          </div>
        </div>
      </div>
    </div>
  );
}

export default WaveBox;