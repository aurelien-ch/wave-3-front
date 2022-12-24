const resources = {
  en: {
    translation: {

      /* Components */

      header: {
        connect: "Connect",
      },
      waveBox: {
        waveHeadline1: "Hi ! My name is Aurélien, and welcome to my first dApp.",
        waveHeadline2: "Here you can wave at me, and each of your waves will be stored on the Ethereum blockchain.",
        waveHeadline3: "You can wave once every 24 hours. Happy waving !",
        yourTotalWaves: "Your total waves : ",
        waveAtMe: "Wave at me",
      },
      howToUse: {
        howToUse: "How to use ?",
        steps: {
          1: "1 - Connect your Metamask wallet",
          2: "2 - Switch to the Goerli test network",
          3: "3 - Claim some fake ETH ",
          4: "4 - Let's wave !",
        },
      },
      wavesList: {
        allWaves: "All waves",
        total: "Total : ",
        waver: "Waver",
        date: "Date",
        prev: "Prev",
        next: "Next",
        noWavesYet: "No waves yet",
        wrongNetwork: "Wrong network !",
        pleaseConnect: "Please connect your wallet to see all waves !",
      },
      topWavers: {
        topWavers: "Top Wavers",
        waver: "Waver",
        waves: "Waves Nb.",
        lastWave: "Last wave",
        noTopWaversYet: "No top wavers yet",
        wrongNetwork: "Wrong network !",
        pleaseConnect: "Please connect your wallet to see the top wavers !",
      },

      /* Others */

      modal: {
        error: "Whoops !",
        close: "Close",
        switchNetwork: "Switch Network",
      },
      errors: {
        notConnected1: "You're not currently connected with your Metamask wallet.",
        notConnected2: "Please connect your wallet to be able to wave at me !",
        installMetamask1: "It looks like you haven't installed the Metamask extension.",
        installMetamask2: "Please visit metamask.io for more info !",
        wrongNetwork: "Please switch to the Goerli test network to be able to wave at me !",
      },
      generic: {
        here: "here",
      },

    }
  }
};

export default resources;