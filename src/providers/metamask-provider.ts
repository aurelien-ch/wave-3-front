import { useStore } from "./state/state-provider";

class MetamaskProvider {
  private ethereum = window.ethereum;

  getEthereum = () => this.ethereum;

  constructor() {
    this.ethereum.addListener("accountsChanged", this.onAccountsChanged);
  }

  private onAccountsChanged(accounts: string[]) {
    useStore.getState().setMetamaskAccount(accounts[0] ?? null);
  }

  async findConnectedAccount() {
    try {
      const accounts = await this.ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        useStore.getState().setMetamaskAccount(accounts[0]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async connectAccount() {
    try {
      const accounts = await this.ethereum.request({ method: "eth_requestAccounts" });

      if (accounts.length) {
        useStore.getState().setMetamaskAccount(accounts[0]);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

const provider = new MetamaskProvider();

export const useMetamaskProvider = () => provider;