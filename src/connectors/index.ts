import { ConnectorNames } from '@nguyenphu27/uikit'
import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { BscConnector } from '@binance-chain/bsc-connector'
import Web3 from "web3"
import WalletConnectProvider from "@maticnetwork/walletconnect-provider"
import { NetworkConnector } from './NetworkConnector'

const maticProvider = new WalletConnectProvider(
  {
    host: `https://rpc-mumbai.matic.today`,
    callbacks: {
      onConnect: console.log('connected'),
      onDisconnect: console.log('disconnected!')
    }
  }
)

const maticWeb3 = new Web3(maticProvider)

console.log("maticWeb3", maticWeb3)

const NETWORK_URL = process?.env?.REACT_APP_NETWORK_URL

export const NETWORK_CHAIN_ID: number = parseInt(process?.env?.REACT_APP_CHAIN_ID ?? '80001')

if (typeof NETWORK_URL === 'undefined') {
  throw new Error(`REACT_APP_NETWORK_URL must be a defined environment variable`)
}

export const network = new NetworkConnector({
  urls: { [NETWORK_CHAIN_ID]: NETWORK_URL },
})

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  // eslint-disable-next-line no-return-assign
  return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any))
}

export const injected = new InjectedConnector({
  supportedChainIds: [80001, 80001],
})

export const bscConnector = new BscConnector({ supportedChainIds: [80001] })

// mainnet only
export const walletconnect = new WalletConnectProvider({
  rpc: 'https://matic-mumbai.chainstacklabs.com',
  bridge: 'https://bridge.walletconnect.org',
  // qrcode: true,
  // pollingInterval: 15000,
})

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: 'https://matic-mumbai.chainstacklabs.com',
  appName: 'Uniswap', 
})

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.BSC]: bscConnector,
}
