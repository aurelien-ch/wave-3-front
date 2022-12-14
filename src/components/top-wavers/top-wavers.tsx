import { useTranslation } from "react-i18next";
import dateFormat from "dateformat";

import { useStore } from "../../providers/state/state-provider";
import { useMetamaskProvider } from "../../providers/metamask-provider";

import { TopWaver } from "../../providers/types";
import "./top-wavers.css";
import "../../styles/list.css";

const TopWavers = () => {
  const { t } = useTranslation();
  const metamaskProvider = useMetamaskProvider();

  const metamaskAccount = useStore(state => state.metamaskAccount);
  const topWavers = useStore(state => state.topWavers);

  return (
    <div className="top-wavers list">
      <div className="title font-bold">
        {t("topWavers.topWavers")}
      </div>
      <div className="elements-container">
        {
          metamaskAccount ? topWavers && topWavers.length ? (
            topWavers.map((topWaver: TopWaver, index: number) => (
              <div
                key={index}
                className="top-waver-element-container flex align-center"
              >
                <div className="position-icon-container flex justify-center align-center">
                  {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : ""}
                </div>
                <div className="element-container flex">
                  <div className="left-container flex">

                    <div>
                      <div className="element-property-name">
                        {t("topWavers.waver")}
                      </div>
                      <div>
                        {metamaskProvider.formatAddress(topWaver.addr)}
                      </div>
                    </div>
                    <div>
                      <div className="element-property-name">
                        {t("topWavers.waves")}
                      </div>
                      <div>
                        {topWaver.wavesCount}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="element-property-name">
                      {t("topWavers.lastWave")}
                    </div>
                    <div>
                      {dateFormat(new Date(topWaver.lastWaveTimestamp * 1000), 'mmm dS, yyyy - HH:MM')}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="info-label">
              {t("topWavers.noTopWaversYet")} 🙁
            </div>
          ) : (
            <div className="info-label">
              {t("topWavers.pleaseConnect")}
            </div>
          )
        }
      </div>
    </div>
  );
};

export default TopWavers;