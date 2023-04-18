// import { ChainId } from '@nguyenphu27/sdk'
import ChainId from '../chainId';
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xDF72E5bA10d72F8FeE09d1e1b22693b5a7DfffE9', // TODO
  [ChainId.TESTNET]: '0xDF72E5bA10d72F8FeE09d1e1b22693b5a7DfffE9'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
