const path = require("path");
var HDWalletProvider = require("truffle-hdwallet-provider");
// const MNEMONIC =  //"<you wallet MNEMONIC>";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),

  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },

    ropsten: {
      provider: function () {
        return new HDWalletProvider(
          MNEMONIC,
          "https://ropsten.infura.io/v3/22161cf82bde4bddb913365af130ff7e"
        );
      },
      network_id: 3,
      gas: 4000000, //make sure this gas allocation isn't over 4M, which is the max
    },
  },
};
