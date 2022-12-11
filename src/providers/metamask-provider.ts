import { ethers, BigNumber } from "ethers";
import i18n from "i18next";

import { useStore } from "./state/state-provider";
import contractABI from "../contract/wave-3.json";

class MetamaskProvider {
  private ethereum = window.ethereum;
  private contractAddress = window.env.CONTRACT_ADDRESS;
  private contract;

  getEthereum = () => this.ethereum;

  constructor() {
    const provider = new ethers.providers.Web3Provider(this.ethereum);
    const signer = provider.getSigner();

    this.contract = new ethers.Contract(this.contractAddress, contractABI.abi, signer);
    this.ethereum.addListener("accountsChanged", this.onAccountsChanged);
  }

  private setStateData = async (account: string | undefined) => {
    useStore.getState().setMetamaskAccount(account ?? undefined);
    useStore.getState().setSenderWavesCount(account ? await this.getSenderWavesCount() : undefined);
    useStore.getState().setTotalWavesCount(account ? await this.getTotalWavesCount() : undefined);
  }

  private onAccountsChanged = async (accounts: string[]) => {
    this.setStateData(accounts[0]);
  }

  findConnectedAccount = async () => {
    try {
      const accounts = await this.ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        this.setStateData(accounts[0]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  connectAccount = async () => {
    try {
      const accounts = await this.ethereum.request({ method: "eth_requestAccounts" });

      if (accounts.length) {
        useStore.getState().setMetamaskAccount(accounts[0]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  getSenderWavesCount = async () => {
    try {
      return BigNumber.from(await this.contract.getSenderWavesCount()).toNumber();
    } catch (error) {
      console.error(error);
    }
  }

  getTotalWavesCount = async () => {
    try {
      return BigNumber.from(await this.contract.getTotalWavesCount()).toNumber();
    } catch (error) {
      console.error(error);
    }
  }

  wave = async () => {
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