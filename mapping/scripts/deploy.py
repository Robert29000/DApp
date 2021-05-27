from brownie import Storage, accounts


def main():
    Storage.deploy({'from': accounts[2]})


