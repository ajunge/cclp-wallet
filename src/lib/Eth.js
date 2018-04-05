import Web3 from 'web3'
import { cCLP} from 'cclp-contracts'

let web3 = window.web3

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

export function version() {
  return web3.eth.net.getId().then(netId => {
    switch (netId) {
      case 1:
        return 'Mainnet'
      case 2:
        return 'Deprecated'
      case 3:
        return 'Ropsten'
      case 4:
        return 'Rinkeby'
      case 42:
        return 'Kovan'
      default:
        return 'Unknown'
    }
  })
}

export function accounts() {
  return web3.eth.getAccounts((e, r) => {
    if (e) {
      return console.log(e)
    }
    return r
  })
}

export function getWeiBalance(address) {
  return web3.eth.getBalance(address)
}

//let instanceContract = null
/*
export function initContract() {
  web3.eth.net.getId().then(networkId => {
    let artifact = RestrictedTransferToken.v1;
    let abi = artifact.abi;
    let addr = artifact.networks[networkId].address

    let contract = web3.eth.contract(abi);
    instanceContract = contract.at(addr)
  })
}*/

export function balance(address) {
  return web3.eth.net.getId().then(networkId => {
    let artifact = cCLP.v1;
    let abi = artifact.abi;
    let addr = artifact.networks[networkId].address

    let instance = new web3.eth.Contract(abi, addr);
    return instance.methods.balanceOf(address).call()
  })
}

export function isAddress(address) {
  return web3.utils.isAddress(address)
}
