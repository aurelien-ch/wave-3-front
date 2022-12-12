import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import dateFormat from "dateformat";

import { useStore } from "../../providers/state/state-provider";
import { useMetamaskProvider } from "../../providers/metamask-provider";

import { Wave } from "../../providers/types";
import "./waves-list.css";

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
    metamaskProvider.getWaves().then((waves: Wave[] | undefined) => setWaves(waves));
  }, [metamaskProvider, offset, setWaves]);

  return (
    <div className="waves-list">
      <div className="flex justify-between font-bold">
        <div className="all-waves-label">
          {t("wavesList.allWaves")}
        </div>
        <div className={`total-waves-container flex align-center ${!metamaskAccount ? "opacity-0-3" : ""}`}>
          {t("wavesList.total")}
          {totalWavesCount ?? "-"}
        </div>
      </div>
      <div className="waves-container">
        {
          metamaskAccount && waves ? (
            waves.map((wave: Wave, index: number) => (
              <div
                key={index}
                className="wave-container flex justify-between"
              >
                <div>{metamaskProvider.formatAddress(wave.waverAddr)}</div>
                <div>{dateFormat(new Date(wave.timestamp * 1000), 'mmm dS, yyyy - HH:MM')}</div>
              </div>
            ))
          ) : (
            <div className="please-connect-label">
              {t("wavesList.pleaseConnect")}
            </div>
          )
        }
      </div>
      <div className="pagination-buttons-container flex justify-between">
        <div
          className="pagination-button"
          onClick={() => setOffset(offset - limit)}
        >
          {t("wavesList.previous")}
        </div>
        <div
          className="pagination-button"
          onClick={() => setOffset(offset + limit)}
        >
          {t("wavesList.next")}
        </div>
      </div>
    </div>
  );
};

export default WavesList;