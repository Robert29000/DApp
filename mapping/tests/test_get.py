import brownie

def test_get(storage, accounts):
    storage.insertHash("Hash1", {'from': accounts[0]})

    assert storage.getHash({'from': accounts[0]}) == "Hash1"
    assert storage.getHash({'from': accounts[1]}) == ""