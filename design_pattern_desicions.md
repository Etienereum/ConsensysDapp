# Samrt Contract Design Patterns

## Introduction

Smart contracts are powerful constructs and sometimes, they are even better than their legal counterparts, because they have the capacity to hold immense value, with their set of autonomous and immutable instructions. Therefore, the security of these instructions are of paramount importance. Design patterns immensely help in this regard because they have been vetted by the community and battle-tested in production.

#### `1. Circuit Breakers:` The Pausable Contract Functionality:

Circuit breakers are use to help stop the execution of certain functions if some necessary conditions are not met. Also, they are used to pause or stop contracts when errors are discovered.

- #### Reason:

  They are designed to suspends actions while giving trust to the only the Admin of the Contract the ability to still moderate and interacte with the token contract. This is to help the stop loss of fund if there are bugs or weaknesses.

- #### Implementation:
  Zamp Token contract implements a Pausable Stop contract functionality. The Zamp Contracts has a circuit breaker pattern which gives the `Admin` the ability to stop all state-changing functionalities on the token contract. This contracts can only be paused or unpause by the `Admin` if malicoius actions or exploits are discovered, and if bugs or weaknesses are discovered. Puasable Contract which has two functions, pause and unpause, and Admin permission is set by two modifies.

#### `2. Upgradable Registry:`

Althought contracts are not meant to be upgradable, we have seen that smart contracts is some times not perfer. It is usually better to modularize the codes as much as possible, separating the logic from the data.

- #### Reason:

  This is to make the contract maintainable when fixes are to be made. This enables the Admin to make upgrades if buygs are found or if there are new contract instructions.

- #### Implementation:
  Zamp implemented a separate contract to keep the record of the token contract upgrades. This is to enable seamless interaction which the new smart contract.

#### `3. Pull over Push Payments:`

The case of letting contracts push payments to recipients is not usually a good practice. It is best to make the recipients pull payments from the contract.

- #### Reason:

  This design pattern was used so as to protect against Reentrancy and Denial of Service attacks.

- #### Implementation:
  In the Token Sales contract, it `require`s the contract Admin to be the only one to push out the funds in the sale contract account to his account. and the admin's contract is fixed into the contract. The functions of the Token contract were mostly push type of functions.
