import { ethers, BigNumber } from "ethers";
import i18n from "i18next";

import { useStore } from "./state/state-provider";
import contractABI from "../contract/wave-3.json";

import { Wave, TopWaver } from "./types";

class MetamaskProvider {
  private ethereum = window.ethereum;
  private contractAddress = window.env.CONTRACT_ADDRESS;
  private contract;

  getEthereum = () => this.ethereum;

  constructor() {
    const provider = new ethers.providers.Web3Provider(this.ethereum);
    const signer = provider.getSigner();

    this.contract = new ethers.Contract(this.contractAddress, contractABI.abi, signer);
    this.ethereum.addListener("accountsChanged", (accounts: string[]) => this.setStateData(accounts[0]));
    this.contract.on("NewWave", this.newWaveUpdate);

    this.findConnectedAccount();
  }

  // Utils

  formatAddress = (address: string): string => {
    return address.substring(0, 6) + "..." + address.substring(address.length - 4);
  }

  private setStateData = async (account: string | undefined) => {
    useStore.getState().setMetamaskAccount(account ?? undefined);
    useStore.getState().setSenderWavesCount(account ? await this.getSenderWavesCount() : undefined);
    useStore.getState().setTotalWavesCount(account ? await this.getTotalWavesCount() : undefined);
    useStore.getState().setWaves(account ? await this.getWaves() : undefined);
    useStore.getState().setTopWavers(account ? await this.getTopWavers() : undefined);
  }

  private newWaveUpdate = () => {
    const metamaskAccount = useStore.getState().metamaskAccount;

    if (metamaskAccount) {
      this.setStateData(metamaskAccount);
    }
  }

  // Ethereum interactions

  private findConnectedAccount = async (): Promise<void> => {
    try {
      const accounts = await this.ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        this.setStateData(accounts[0]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  connectAccount = async (): Promise<void> => {
    try {
      const accounts = await this.ethereum.request({ method: "eth_requestAccounts" });

      if (accounts.length) {
        useStore.getState().setMetamaskAccount(accounts[0]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Contract interactions

  private getSenderWavesCount = async (): Promise<number | undefined> => {
    try {
      return BigNumber.from(await this.contract.getSenderWavesCount()).toNumber();
    } catch (error) {
      console.error(error);
    }
  }

  private getTotalWavesCount = async (): Promise<number | undefined> => {
    try {
      return BigNumber.from(await this.contract.getTotalWavesCount()).toNumber();
    } catch (error) {
      console.error(error);
    }
  }

  getWaves = async (): Promise<Wave[] | undefined> => {
    try {
      const offset = useStore.getState().offset;
      const limit = useStore.getState().limit;

      return (await this.contract.getWaves(offset, limit))
        .map(({ waverAddr, timestamp }: any) => ({ waverAddr, timestamp }));
    } catch (error) {
      console.error(error);
    }
  }

  private getTopWavers = async (): Promise<TopWaver[] | undefined> => {
    try {
      return (await this.contract.getTopWavers())
        .filter((e: any) => e.length)
        .map(({ addr, wavesCount, lastWaveTimestamp }: any) => ({
          addr,
          wavesCount: BigNumber.from(wavesCount).toNumber(),
          lastWaveTimestamp,
        }))
        .filter((waver: TopWaver) => !ethers.constants.HashZero.includes(waver.addr));
    } catch (error) {
      console.error(error);
    }
  }

  wave = async (): Promise<void> => {
    try {
      const waveTxn = await this.contract.wave();

      await waveTxn.wait();
      this.setStateData(useStore.getState().metamaskAccount);
    } catch (error: any) {
      const errorReason = error.reason.replace("execution reverted: ", "");

      if (error.code !== "ACTION_REJECTED") {
        useStore.getState().setShowModal(true,
          i18n.t("modal.error"),
          [errorReason.charAt(0).toUpperCase() + errorReason.slice(1)]
        );
      }

      console.error(error);
    }
  }
}

const provider = new MetamaskProvider();

export const useMetamaskProvider = () => provider;