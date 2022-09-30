import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { chainConfig } from "../constants/Config";

export const connectWeb3Auth = async () => {
  try {
    const web3auth = await new Web3Auth({
      // type UIConfig
      uiConfig: {
        appLogo: "https://pbs.twimg.com/media/B95HrLyIcAAw2TT.jpg",
        theme: "dark",
        loginMethodsOrder: ["google", "facebook"],
      },
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: chainConfig.ethTestnetChainConfig.chainId,
        rpcTarget: chainConfig.ethTestnetChainConfig.rpcTarget,
        displayName: chainConfig.ethTestnetChainConfig.displayName,
        blockExplorer: chainConfig.ethTestnetChainConfig.blockExplorer,
        ticker: chainConfig.ethTestnetChainConfig.ticker,
        tickerName: chainConfig.ethTestnetChainConfig.tickerName,
      },
      clientId:
        process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID ||
        "BMQy-NVFv500r-TUYAQXZLcGrS2pP_YKgWfK_32v9mk5fzrSq_j3KFr6faH3xdB_PQTxyZxeQw6W6Cu1JIcCkkU",
    });

    console.log("web3auth: ", web3auth);

    await web3auth.initModal();
    return web3auth;
  } catch (error) {
    console.log("connectWeb3Auth error: ", error);
    throw error;
  }
};
