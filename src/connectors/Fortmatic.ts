import { ChainId } from '@uniswap/sdk'
import { FortmaticConnector as FortmaticConnectorCore } from '@web3-react/fortmatic-connector'

export const OVERLAY_READY = 'OVERLAY_READY'

type FormaticSupportedChains = Extract<
  ChainId,
  | ChainId.MAINNET
  | ChainId.ROPSTEN
  | ChainId.RINKEBY
  | ChainId.GOERIL
  | ChainId.KOVAN
  | ChainId.ARBITRUM_RINKEBY
  | ChainId.ARBITRUM
  | ChainId.AVALANCHE_FUJI_TESTNET
  | ChainId.AVALANCHE_CMAINNET
  | ChainId.FANTOM_TESTNET
  | ChainId.FANTOM
  | ChainId.BNBTESTNET
  | ChainId.BNB
  | ChainId.OPTIMISM_GOERLI
  | ChainId.OPTIMISM
  | ChainId.POLYGON
  | ChainId.MUMBAI
  | ChainId.HARMONY
  | ChainId.HARMONY_TESTNET
  | ChainId.HECO
  | ChainId.HECO_TESTNET
  | ChainId.ETHClassic
  | ChainId.CELO
  | ChainId.CELO_TESTNET
>

const CHAIN_ID_NETWORK_ARGUMENT: { readonly [chainId in FormaticSupportedChains]: string | undefined } = {
  // [ChainId.MAINNET]: undefined,
  // [ChainId.ROPSTEN]: 'ropsten',
  // [ChainId.RINKEBY]: 'rinkeby',
  // [ChainId.KOVAN]: 'kovan',
  // [ChainId.ARBITRUM_TESTNET]: 'arbitrum testnet',
  [ChainId.MAINNET]: undefined,
  [ChainId.ROPSTEN]: 'ROPSTEN',
  [ChainId.RINKEBY]: 'RINKEBY',
  [ChainId.GOERIL]: 'GOERIL',
  [ChainId.KOVAN]: 'KOVAN',
  [ChainId.ARBITRUM_RINKEBY]: 'ARBITRUM_RINKEBY',
  [ChainId.ARBITRUM]: 'ARBITRUM',
  [ChainId.AVALANCHE_FUJI_TESTNET]: 'AVALANCHE_FUJI_TESTNET',
  [ChainId.AVALANCHE_CMAINNET]: 'AVALANCHE_CMAINNET',
  [ChainId.FANTOM_TESTNET]: 'FANTOM_TESTNET',
  [ChainId.FANTOM]: 'FANTOM',
  [ChainId.BNBTESTNET]: 'BNBTESTNET',
  [ChainId.BNB]: 'BNB',
  [ChainId.OPTIMISM_GOERLI]: 'OPTIMISM_GOERLI',
  [ChainId.OPTIMISM]: 'OPTIMISM',
  [ChainId.POLYGON]: 'POLYGON',
  [ChainId.MUMBAI]: 'MUMBAI',
  [ChainId.HARMONY]: 'HARMONY',
  [ChainId.HARMONY_TESTNET]: 'HARMONY_TESTNET',
  [ChainId.HECO]: 'HECO',
  [ChainId.HECO_TESTNET]: 'HECO_TESTNET',
  [ChainId.ETHClassic]: 'ETHClassic',
  [ChainId.CELO]: 'CELO',
  [ChainId.CELO_TESTNET]: 'CELO_TESTNET'
}

export class FortmaticConnector extends FortmaticConnectorCore {
  async activate() {
    if (!this.fortmatic) {
      const { default: Fortmatic } = await import('fortmatic')

      const { apiKey, chainId } = this as any
      if (chainId in CHAIN_ID_NETWORK_ARGUMENT) {
        this.fortmatic = new Fortmatic(apiKey, CHAIN_ID_NETWORK_ARGUMENT[chainId as FormaticSupportedChains])
      } else {
        throw new Error(`Unsupported network ID: ${chainId}`)
      }
    }

    const provider = this.fortmatic.getProvider()

    const pollForOverlayReady = new Promise<void>(resolve => {
      const interval = setInterval(() => {
        if (provider.overlayReady) {
          clearInterval(interval)
          this.emit(OVERLAY_READY)
          resolve()
        }
      }, 200)
    })

    const [account] = await Promise.all([
      provider.enable().then((accounts: string[]) => accounts[0]),
      pollForOverlayReady
    ])

    return { provider: this.fortmatic.getProvider(), chainId: (this as any).chainId, account }
  }
}
