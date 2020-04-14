# Zamp Token Application

## Introduction

Tokenization can be referred to the process of substituting a sensitive identity with a non-sensitive equivalent with is referred to as a token. This Token may have no extrinsic or exploitable meaning or value. Althought this school of thought seems to be true, in recent times, Bitcoin and Ethereum has proven and shown that tokens can be as valuable as the equivalent used for their exchange.

This is a project built with [Truffle](https://www.trufflesuite.com/) and the UI is developed with ReactJS. The contracts are deployed to the [Ropsten Network](https://ropsten.etherscan.io/), and the deployed_addresses.txt file has the deployed details. The [Infura API](https://infura.io/) for Ropsten were used to make the contract deployments.The contracts are also [verified](https://ropsten.etherscan.io/address/0x6361Ee5057913Ee974cb55851bDF8adA1846A139#code) on the Ropsten Network.

## Explanations

### `What is Zamp dApp?`

Zamp Token Sale Application is an Decentralised application which has two basic functionalities and they are:

1. A Mini Wallet functionalities.
2. A Token Sales App.

#### 1) Mini-Wallet:

As a Mini-Wallet, it has the functionality of being able to transfer tokens. It shows your Account Address, Account balance, Address Transaction history etc. It excludes functions like Account creation and Key management, this is handled by [MetaMask](https://metamask.io/) Chrome Extension.

#### 2) Token Sales App:

This show the key funtionalities of a Token Sales Process. It allows users to interract only with what is most important in token salse and that is the token purchase and Ether payment. Also, it show UI updates as the sale is going on.

`Note`: That the certain portion of the Token which is set for sale is transferred manually to the TokenSale Contract account. This was to show my understanding of how to use truffle console commands and Web3js.

### `Why I built Zamp Token dApp?`

It expresses my understanding of Tokenisation which includes but not limited to Token Creation, Token Sales and Simple Token wallet Application.

Generally, much expertise was put into the authoring of the `Zamp Token Contract`. This contract was design to show my understanding and skill set of the current industry standard and best practises in Smart Contracts Development.

### `Details on how to Setup Zamp dApp:`

Aleady, necessary configurations have been set in the `truffle-config.js` file to easy the setting up proccess. Also, the UI is a React Application with a simple web server. Below describes how to set up the app UI, connected to a `Public` or `Private` Blockchain network.

- Public Network Setup:

  There are several public blockchain test networks but this Applications is on Ropsten testnt. Before you startup the client, make sure your `truffle-config.js` file looks like this:

  ```js
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
            "<https://ropsten.infura.io/v3/your INFURA API>"
          );
        },
        network_id: 3,
        gas: 4000000, //make sure this gas allocation isn't over 4M, which is the max
      },
    },
  };
  ```

  Substitue your Ropsten API and update the `"<https://ropsten.infura.io/v3/your INFURA API>"`. You can signup on [Infura](https://infura.io/) to obtain the API. This is enable you not to run a full public ethereum node. Replace your `<you wallet MNEMONIC>` form your MetaMask wallet account. Also, install `Truffle HDWalletProvider` with

  ```
  $ npm install HDWalletProvider
  ```

* UI Setup:

  You will need to make sure that you have a Web3 enabled browser. If not, you and install the [Metamask](https://metamask.io/download.html) browser extension. Brave browsers are not usually the best but Chrome or FireFox.

  Open up the root directory of this project on your Terminal. Navigate to the `client` directory and Startup up the web server

  ```js
  $ cd client
  $ npm run start
  ```

  This will serve the application UI on localhost at port
  [3000](http://localhost:3000/)

  At this

- Private Networks Setting:

  It might not be necessary to run a private newtork since the deployed contracts are on Ropsten, but you can still change the addresses and deploy your own token with this app if you want. You can make this new deployment on the public or private networks. Lets describe the Private Network settings for this type of deployment.

  Before you startup your private network, change the network settings in the `truffle-config.js` file to:

  ```
  networks: {
      develop: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
      },
  };
  ```

  You will still need `MetaMask` but not the `HDWalletProvider`, your wallet `MNEMONIC` nor the `Infura API`.

Then, start up your private network, like Ganache, through the CLI or GUI and refresh your web browser UI running on `localhost:3000`.

#### Private Networks Deployment Configurations

Open the truffle console with

```js
$ truffle develop
```

Migrate the contracts

```js
> migrate

```

Interact the deployed contracts

```js
> ZampTokenSale.deployed().then(function (i) { tokenSale = i; });

> ZampToken.deployed().then(function (i) { token = i; });
```

And then, get the instances of the Contracts

```js
> tokenSale

> token
```

Get the Admin account active and set the available token for sale

```js
> var account0; web3.eth.getAccounts().then(function(result){ account0 = result[0];})

> tokensAvailable = "750000000000000000000000"
```

Transfer the `Number of Tokens` to sold

```js
> token.transfer(tokenSale.address, tokensAvailable, { from: account0 } )
```

You can check the TokenSale Contract and the admin account balance

```js
> token.balanceOf(tokenSale.address)

> token.balanceOf(account0)
```

## Conclusion

The inevitable adoption of Blockchain technology will render numerous practices obsolete. It may be a bold and distant conjecture, but services such as banking will be made redundant as the world learns to operate and finance itself.
