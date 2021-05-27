import brownie


def test_insert(accounts, storage):
    storage.insertHash("Hash1", {'from': accounts[0]})

    assert storage.ipfs_hashes(accounts[0]) == "Hash1"

    storage.insertHash("Hash2", {'from': accounts[1]})

    assert storage.ipfs_hashes(accounts[0]) == "Hash1"
    assert storage.ipfs_hashes(accounts[1]) == "Hash2"


def test_double_insert(accounts, storage):
    storage.insertHash("Hash1", {'from': accounts[0]})

    assert storage.ipfs_hashes(accounts[0]) == "Hash1"

    storage.insertHash("Hash2", {'from': accounts[0]})

    assert storage.ipfs_hashes(accounts[0]) == "Hash2"