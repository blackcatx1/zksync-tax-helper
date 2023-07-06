import { Provider } from "zksync-web3";

export interface Config {
  provider: Provider;
}

let config: Config;
export async function getConfig(): Promise<Config> {
  if (config === undefined) {
    // Create a Provider for the zkSync Era network
    const provider = new Provider("https://mainnet.era.zksync.io");
    config = { provider };
  }
  return config;
}
