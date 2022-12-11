import { ethers, BigNumber } from "ethers";
import i18n from "i18next";

import { useStore } from "./state/state-provider";
import contractABI from "../contract/wave-3.json";

import { Wave } from "./types";

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
  }

  // Utils

  formatAddress = (address: string): string => {
    return address.substring(0, 6) + "..." + address.substring(address.length - 4);
  }

  private setStateData = async (account: string | undefined) => {
    useStore.getState().setMetamaskAccount(account ?? undefined);
    useStore.getState().setSenderWavesCount(account ? await this.getSenderWavesCount() : undefined);
    useStore.getState().setTotalWavesCount(account ? await this.getTotalWavesCount() : undefined);
    console.log(await this.getWaves());

    useStore.getState().setWaves(account ? await this.getWaves() : undefined);
  }

  // Ethereum interactions

  findConnectedAccount = async (): Promise<void> => {
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

  getSenderWavesCount = async (): Promise<number | undefined> => {
    try {
      return BigNumber.from(await this.contract.getSenderWavesCount()).toNumber();
    } catch (error) {
      console.error(error);
    }
  }

  getTotalWavesCount = async (): Promise<number | undefined> => {
    try {
      return BigNumber.from(await this.contract.getTotalWavesCount()).toNumber();
    } catch (error) {
      console.error(error);
    }
  }

  getWaves = async (): Promise<Wave[] | undefined> => {
    try {
      return (await this.contract.getWaves())
        .map(({ waverAddr, timestamp }: any) => ({ waverAddr, timestamp }));
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
      if (error.code !== "ACTION_REJECTED") {
        useStore.getState().setShowModal(true,
          i18n.t("modal.error"),
          [error.reason.replace("execution reverted: ", "")],
        );
      }

      console.error(error);
    }
  }
}

const provider = new MetamaskProvider();

export const useMetamaskProvider = () => provider;