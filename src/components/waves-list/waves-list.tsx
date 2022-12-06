import { useTranslation } from "react-i18next";

import "./waves-list.css";

// const waves = [{

// }];

const WavesList = () => {
  const { t } = useTranslation();
  const totalWaves = 42;

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