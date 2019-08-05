import { Api, JsonRpc } from 'eosjs'
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'; 

const appName = '微文';
const contract = 'weiwendapps2';

// jungle testnet
// const network = {
//   blockchain: 'eos',
//   protocol: 'https',
//   host: 'api.jungle.alohaeos.com',
//   port: 443,
//   chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
// };

// mainnet
const network = {
  blockchain: 'eos',
  protocol: 'https',
  host: 'api.eosnewyork.io',
  port: 80,
  chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
};

const signatureProvider = new JsSignatureProvider(['5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr']);
const url = network.protocol + '://' + network.host + ':' + network.port;

const rpc = new JsonRpc(url, { fetch })
const api = new Api({
  rpc,
  signatureProvider,
  chainId: network.chainId,
  textDecoder: new TextDecoder(),
  textEncoder: new TextEncoder(),
});

export { api, rpc, network, appName, contract }