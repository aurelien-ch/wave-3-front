import { ethers, BigNumber } from "ethers";
import i18n from "i18next";

import { useStore } from "./state/state-provider";
import contractABI from "../contract/wave-3.json";

import { Wave, TopWaver } from "./types";

class MetamaskProvider {
  private ethereum = window.ethereum;
  private contractAddress = window.env.CONTRACT_ADDRESS;
  private chainId = window.env.CHAIN_ID;
  private contract;

  getEthereum = () => this.ethereum;

  constructor() {
    if (this.getEthereum()) {
      const provider = new ethers.providers.Web3Provider(this.ethereum, "any");
      const signer = provider.getSigner();

      this.contract = new ethers.Contract(this.contractAddress, contractABI.abi, signer);
      this.contract.on("NewWave", this.newWaveUpdate);

      this.ethereum.addListener("accountsChanged", (accounts: string[]) => this.setStateData(accounts[0]));
      this.ethereum.addListener("networkChanged", this.onNetworkChanged);

      this.findConnectedAccount();
    }
  };

  // Utils

  formatAddress = (address: string): string => {
    return address.substring(0, 6) + "..." + address.substring(address.length - 4);
  };

  private setStateData = async (account: string | undefined) => {
    useStore.getState().setMetamaskAccount(account ?? undefined);
    useStore.getState().setSenderWavesCount(account ? await this.getSenderWavesCount() : undefined);
    useStore.getState().setTotalWavesCount(account ? await this.getTotalWavesCount() : undefined);
    useStore.getState().setWaves(account ? await this.getWaves() : undefined);
    useStore.getState().setTopWavers(account ? await this.getTopWavers() : undefined);
    useStore.getState().setModal({ show: false });
  };

  private newWaveUpdate = () => {
    const metamaskAccount = useStore.getState().metamaskAccount;

    if (metamaskAccount) {
      this.setStateData(metamaskAccount);
    }
  };

  private onNetworkChanged = (network: string) => {
    if (useStore.getState().metamaskAccount && network !== this.chainId) {
      useStore.getState().setModal({
        show: true,
        title: i18n.t("modal.error"),
        content: [i18n.t("errors.wrongNetwork")],
        buttonTitle: i18n.t("modal.switchNetwork")!,
        buttonFunction: () => this.switchChain(),
      });
    } else {
      useStore.getState().setModal({ show: false });
      this.setStateData(useStore.getState().metamaskAccount);
    }
  };

  // Ethereum wallet interactions

  private findConnectedAccount = async (): Promise<void> => {
    try {
      const accounts = await this.ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        this.setStateData(accounts[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  connectAccount = async (): Promise<void> => {
    try {
      const accounts = await this.ethereum.request({ method: "eth_requestAccounts" });

      if (accounts.length) {
        useStore.getState().setMetamaskAccount(accounts[0]);

        // If wrong network selected, switch to desired network

        if (this.ethereum.networkVersion !== this.chainId) {
          this.switchChain();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  private switchChain = async () => {
    await this.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${this.chainId.toString(16)}` }],
    });
  };

  // Contract interactions

  private getSenderWavesCount = async (): Promise<number | undefined> => {
    try {
      return BigNumber.from(await this.contract?.getSenderWavesCount()).toNumber();
    } catch (error) {
      console.error(error);
    }
  };

  private getTotalWavesCount = async (): Promise<number | undefined> => {
    try {
      return BigNumber.from(await this.contract?.getTotalWavesCount()).toNumber();
    } catch (error) {
      console.error(error);
    }
  };

  getWaves = async (): Promise<Wave[] | undefined> => {
    try {
      const offset = useStore.getState().offset;
      const limit = useStore.getState().limit;

      return (await this.contract?.getWaves(offset, limit))
        .map(({ waverAddr, timestamp }: Wave) => ({ waverAddr, timestamp }));
    } catch (error) {
      console.error(error);
    }
  };

  private getTopWavers = async (): Promise<TopWaver[] | undefined> => {
    try {
      return (await this.contract?.getTopWavers())
        .filter((e: any) => e.length)
        .map(({ addr, wavesCount, lastWaveTimestamp }: TopWaver) => ({
          addr,
          wavesCount: BigNumber.from(wavesCount).toNumber(),
          lastWaveTimestamp,
        }))
        .filter((waver: TopWaver) => !ethers.constants.HashZero.includes(waver.addr));
    } catch (error) {
      console.error(error);
    }
  };

  wave = async (): Promise<void> => {
    if (!useStore.getState().metamaskAccount) {
      useStore.getState().setModal({
        show: true,
        title: i18n.t("modal.error"),
        content: [i18n.t("errors.notConnected1"), i18n.t("errors.notConnected2")],
        buttonTitle: i18n.t("header.connect")!,
        buttonFunction: () => this.connectAccount(),
      });
    } else if (this.ethereum.networkVersion !== this.chainId) {
      useStore.getState().setModal({
        show: true,
        title: i18n.t("modal.error"),
        content: [i18n.t("errors.wrongNetwork")],
        buttonTitle: i18n.t("modal.switchNetwork")!,
        buttonFunction: () => this.switchChain(),
      });
    } else {
      try {
        const waveTxn = await this.contract?.wave();

        await waveTxn.wait();
        this.setStateData(useStore.getState().metamaskAccount);
      } catch (error: any) {
        const errorReason = error.reason.replace("execution reverted: ", "");

        if (error.code !== "ACTION_REJECTED") {
          useStore.getState().setModal({
            show: true,
            title: i18n.t("modal.error"),
            content: [errorReason.charAt(0).toUpperCase() + errorReason.slice(1)],
          });
        }

        console.error(error);
      }
    }
  };
};

const provider = new MetamaskProvider();

export const useMetamaskProvider = () => provider;