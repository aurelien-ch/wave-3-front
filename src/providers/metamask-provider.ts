import { ethers, BigNumber } from "ethers";

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

  private onAccountsChanged(accounts: string[]) {
    useStore.getState().setMetamaskAccount(accounts[0] ?? null);
  }

  findConnectedAccount = async () => {
    try {
      const accounts = await this.ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        useStore.getState().setMetamaskAccount(accounts[0]);
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

  getTotalWaves = async () => {
    try {
      return BigNumber.from(await this.contract.getTotalWaves()).toNumber();
    } catch (error) {
      console.error(error);
    }
  }

  wave = async () => {
    try {
    } catch (error) {
      console.error(error);
    }
  }
}

const provider = new MetamaskProvider();

export const useMetamaskProvider = () => provider;