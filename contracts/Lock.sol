// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock {
    uint public unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);
    event Deposit(address indexed from, uint amount, unit when);

    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        //check if the current time is greater than the unlock time
        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        //check if the owner is the sender of the current withdraw message
        require(msg.sender == owner, "You aren't the owner");

        //withdraw the amount
        emit Withdrawal(address(this).balance, block.timestamp);
        //transfer to owner
        owner.transfer(address(this).balance);
    }

    function deposit() public payable {
        require(msg.value > 0, "Deposit must be greater than zero");

        emit Deposit(msg.sender, msg.value, block.timestamp);
    }
}
