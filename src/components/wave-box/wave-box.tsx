import { useTranslation } from "react-i18next";

import "./wave-box.css";

const WaveBox = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center">
      <div className="wave-box flex">
        <div style={{ flex: 3 }}>
          <div>
            {t("waveHeadline1")}
          </div>
          <div>
            {t("waveHeadline2")}
          </div>
          <div>
            {t("waveHeadline3")}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div>
            {t("yourTotalWaves")}
          </div>
          <div>
            {t("waveAtMe")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WaveBox;