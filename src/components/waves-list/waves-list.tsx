import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import dateFormat from "dateformat";

import { useStore } from "../../providers/state/state-provider";
import { useMetamaskProvider } from "../../providers/metamask-provider";

import { Wave } from "../../providers/types";
import "./waves-list.css";
import "../../styles/list.css";

const WavesList = () => {
  const { t } = useTranslation();
  const metamaskProvider = useMetamaskProvider();

  const metamaskAccount = useStore(state => state.metamaskAccount);
  const totalWavesCount = useStore(state => state.totalWavesCount);
  const waves = useStore(state => state.waves);

  const setWaves = useStore(state => state.setWaves);
  const offset = useStore(state => state.offset);
  const setOffset = useStore(state => state.setOffset);
  const limit = useStore(state => state.limit);

  useEffect(() => {
    if (metamaskAccount) {
      // On page change, get waves with new offset
      metamaskProvider.getWaves().then((waves: Wave[] | undefined) => setWaves(waves));
    }
  }, [metamaskAccount, metamaskProvider, offset, setWaves]);

  return (
    <div className="waves-list list flex flex-1 flex-columns justify-between">
      <div>
        <div className="flex justify-between font-bold">
          <div className="title">
            {t("wavesList.allWaves")}
          </div>
          <div className={`total-waves-container flex align-center ${!metamaskAccount ? "opacity-0-3" : ""}`}>
            {t("wavesList.total")}
            {totalWavesCount ?? "-"}
          </div>
        </div>
        <div className="elements-container">
          {
            metamaskAccount ? waves && waves.length ? (
              waves.map((wave: Wave, index: number) => (
                <div
                  key={index}
                  className="element-container flex justify-between"
                >
                  <div>
                    <div className="element-property-name">
                      {t("wavesList.waver")}
                    </div>
                    <div>
                      {metamaskProvider.formatAddress(wave.waverAddr)}
                    </div>
                  </div>
                  <div>
                    <div className="element-property-name">
                      {t("wavesList.date")}
                    </div>
                    <div>
                      {dateFormat(new Date(wave.timestamp * 1000), "mmm dS, yyyy - HH:MM")}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="info-label">
                {t("wavesList.noWavesYet")} 🙁
              </div>
            ) : (
              <div className="info-label">
                {t("wavesList.pleaseConnect")}
              </div>
            )
          }
        </div>
      </div>
      {
        metamaskAccount && waves && waves.length ? (
          <div className="pagination-buttons-container flex align-center">
            <div className="flex-1">
              <div
                className={`pagination-button  ${offset === 0 ? "disabled" : ""}`}
                onClick={() => setOffset(offset - limit)}
              >
                {t("wavesList.prev")}
              </div>
            </div>
            <div className="flex-1">
              <div className="pagination-counter flex justify-center">
                {(offset / limit) + 1} / {Math.ceil(totalWavesCount! / limit)}
              </div>
            </div>
            <div className="flex flex-1 justify-end">
              <div
                className={`pagination-button ${offset + limit > totalWavesCount! - 1 ? "disabled" : ""}`}
                onClick={() => setOffset(offset + limit)}
              >
                {t("wavesList.next")}
              </div>
            </div>
          </div>
        ) : null
      }
    </div>
  );
};

export default WavesList;