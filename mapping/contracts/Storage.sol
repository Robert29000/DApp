// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract Storage {

    mapping(address => string) public ipfs_hashes;

    function insertHash(string memory hash) public {
        ipfs_hashes[msg.sender] = hash;
    }

    function getHash() public view returns (string memory){
        return ipfs_hashes[msg.sender];
    }
}