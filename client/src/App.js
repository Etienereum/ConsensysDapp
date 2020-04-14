import React, { Component } from "react";
import { Progress } from "reactstrap";
import ZampToken from "./contracts/ZampToken.json";
import ZampTokenSale from "./contracts/ZampTokenSale.json";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import getWeb3 from "./getWeb3";

class App extends Component {
  state = {
    worth: 0,
    tokenPriceWei: 0,
    totalSupply: 0,
    balance: 0,
    tokenSold: 0,
    tokenAvailable: 0,
    progress: null,
    web3: null,
    accounts: null,
    contractAddress: 0,
    contractToken: null,
    contractSale: null,
    transactions: [],
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the different instances of both contracts.
      const networkId = await web3.eth.net.getId();

      // Getting the Token Instance
      const deployedNetworkToken = ZampToken.networks[networkId];
      const tokenInstance = new web3.eth.Contract(
        ZampToken.abi,
        deployedNetworkToken && deployedNetworkToken.address
      );

      // Getting the TokenSales Instance
      const deployedNetworkSale = ZampTokenSale.networks[networkId];
      const tokenSaleInstance = new web3.eth.Contract(
        ZampTokenSale.abi,
        deployedNetworkSale && deployedNetworkSale.address
      );
      const contractAddress = deployedNetworkSale.address;

      // Set web3, accounts, and contract to the state, and then a load method
      this.setState(
        {
          web3,
          accounts,
          contractAddress,
          contractToken: tokenInstance,
          contractSale: tokenSaleInstance,
        },
        this.runLoader
      );
    } catch (error) {
      // Catching any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contracts. Check console for details.`
      );
      console.error(error);
    }
  };

  runLoader = async () => {
    const {
      web3,
      accounts,
      contractSale,
      contractAddress,
      contractToken,
    } = this.state;

    // Get the Total Supply of Zamp Tokens.
    const supply = await contractToken.methods.totalSupply().call();
    const supplyFromWei = web3.utils.fromWei(supply.toString(), "ether");
    this.setState({ totalSupply: supplyFromWei });

    // Get the Token Price in Ether.
    const weiPrice = await contractSale.methods.tokenPrice().call();
    this.setState({ tokenPriceWei: weiPrice });
    console.log(weiPrice);

    // Get the Token balance of the current account.
    var balance = await contractToken.methods
      .balanceOf(accounts.toString())
      .call();
    var balanceFromWei = web3.utils.fromWei(balance.toString(), "ether");
    this.setState({ balance: balanceFromWei });

    // Get the Token balance of the Sales Contract account.
    var balanceSL = await contractToken.methods
      .balanceOf(contractAddress)
      .call();
    var balanceSLFromWei = web3.utils.fromWei(balanceSL.toString(), "ether");
    this.setState({ tokenAvailable: balanceSLFromWei });
    console.log(balanceSLFromWei);

    // Get the Amount of Token sold, and Calc the progressBar
    var tokenSold = await contractSale.methods.tokensSold().call();
    // var tokenSoldFromWei = web3.utils.fromWei(tokenSold.toString(), "ether");
    this.setState({ tokenSold: tokenSold });

    // Calculating the progressBar
    var progress = Math.ceil(
      (this.state.tokenSold / this.state.tokenAvailable) * 100
    );
    this.setState({ progress });

    // Get the Transfer Event of the current account.
    var txn = await contractToken.getPastEvents("Transfer", {
      filter: { from: accounts },
      fromBlock: 0,
      toBloack: "lastest",
    });
    this.setState({ transactions: txn });
    console.log(txn);
  };

  // Function to buy zamp token and pay the admin in Ether
  buyTokens = async (numberOfTokens) => {
    const { accounts, tokenPriceWei, contractSale } = this.state;
    console.log(numberOfTokens);

    await contractSale.methods
      .buyTokens(numberOfTokens.toString())
      .send({
        from: accounts.toString(),
        value: tokenPriceWei * numberOfTokens,
      })
      .on("error", console.error);

    console.log("Tokens were bought...");
  };

  // Function to transfer Token
  transferFunc = async (recipient, amount) => {
    const { accounts, contractToken, web3 } = this.state;

    // Converting the number of token to transfer to Wei
    var amtToWei = web3.utils.toWei(amount, "ether");

    await contractToken.methods
      .transfer(recipient, amtToWei)
      .send({ from: accounts.toString() });
  };

  render() {
    if (!this.state.web3) {
      return (
        <div id="loader">
          <br />
          <p className="text-center">
            Loading Web3, Accounts, and Contracts ...{" "}
          </p>
        </div>
      );
    }
    return (
      <div className="App">
        <h1>Zamp Token</h1>
        <hr />
        <p>
          ZampToken Total Suppy is {this.state.totalSupply}ZMP, selling at{" "}
          {this.state.web3.utils.fromWei(
            this.state.tokenPriceWei.toString(),
            "ether"
          )}{" "}
          Ether per Token.{} Ether per Token.
        </p>
        <p>
          Your Account {this.state.accounts}, currently has a balance of{" "}
          {this.state.balance} ZMP Tokens.{" "}
        </p>
        {/* This form is to buy Zamp Token */}
        <div className="container" style={{ width: "550px" }}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const numberOfTokens = this.numberOfTokens.value;
              this.buyTokens(numberOfTokens);
            }}
          >
            <div className="form-group">
              <div className="input-group">
                <input
                  id="numberOfTokens"
                  type="number"
                  ref={(input) => {
                    this.numberOfTokens = input;
                  }}
                  className="form-control input-lg"
                  pattern="[0-9]"
                  min="1"
                  placeholder="Number Of Tokens you want"
                  required
                />
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-primary btn-block">
                    Buy Tokens
                  </button>
                </span>
              </div>
            </div>
          </form>
          <div>
            {/* progress bar */}
            <div>
              <Progress
                animated
                color="success"
                value={this.state.progress}
                min={0}
                max={100}
              />
            </div>
            <br />
            <p>
              {this.state.tokenSold} / {this.state.tokenAvailable} tokens has
              been sold
            </p>
          </div>
        </div>
        <hr />
        {/* This is for transfer of Zamp Token */}
        <div className="content mr-auto ml-auto" style={{ width: "740px" }}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const recipient = this.recipient.value;
              const amount = this.amount.value;
              this.transferFunc(recipient, amount);
              console.log(amount);
            }}
          >
            <div className="form-group">
              <div className="input-group">
                <input
                  id="recipient"
                  type="text"
                  ref={(input) => {
                    this.recipient = input;
                  }}
                  className="form-control input-lg"
                  placeholder="Recipient Address"
                  required
                />
                <input
                  id="amount"
                  type="text"
                  ref={(input) => {
                    this.amount = input;
                  }}
                  className="form-control input-lg"
                  placeholder="Amount"
                  required
                />
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-primary btn-block">
                    Send Tokens
                  </button>
                </span>
              </div>
            </div>
          </form>
        </div>
        <hr />
        {/* This is get the Transaction History of an account through "Tranfer Event"*/}
        <div className="container" style-prop="width: 450px;">
          <strong>Transcation History</strong>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Recipient</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {this.state.transactions.map((tx, index) => {
                // Getting data from the transactions array for the transaction history
                return (
                  <tr key={index}>
                    <td> {tx.returnValues._to} </td>
                    <td>
                      {this.state.web3.utils.fromWei(
                        tx.returnValues._value.toString(),
                        "ether"
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
