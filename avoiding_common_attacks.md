# Smart Contract Attacks and Pit Falls

## Introduction

Having been following the crypto space for 3years now, I have heard of many smart contract attacks. These attacks have resulted in crypto asset thefts, worthing a lot of dollars. The most notable attack remains the DAO attack. It is imperative for us to understand Smart Contract pit falls and attacks which can expose one to expliots.

## Explanation (3 common attacks and how Zamp Dapp mitigates them)

#### `1) Reentrancy Attacks:`

As the name implies, this bug mostly involve functions that can be called repeatedly, before the first invocation of the function was finished.

- MITIGATION: For instance, Zamp mitigates this in the `buyToken function` of the Sales Contract by requiring the `msg.value` first before making the necessary transfers of the number of Token. Zamp Token Contract `Transfer function` checks and resolves fee payment to make it expensive for reentrancy.

#### `2) Integer Overflow and Underflow:`

If a unit reaches the maximum value of `2^256`, it circles back to zero. Depending on Zamp Token implementation, this is very relevant.

- MITIGATION: To be on the safer side, Zamp eliminates this class of bugs by using a SafeMath library which checks for integer overflow or underflow. Zamp Contracts carefully avoided smaller data-types like uint8, uint16, uint24...etc, when necessary, for they can more susceptible to this error.

#### `3) Timestamp Dependence:`

The timestamp of blocks can be manipulated by a miner, and all direct and indirect usage of the timestamp was avoid.

- MITIGATION: Although it has a token sale contracts, Zamp did not implement block timestamp utility.

#### `4) Lock Pragmas to specific compiler version:`

Contracts may also be deployed by others and the pragma indicates the compiler version intended by the original author.

- MITIGATION: Zamp locked the Pragmas to version 0.5.8. This has show to be a very stable version in recent times.
