var http = require('http'),
    express = require('express'),
    Busboy = require('busboy'),
    fs = require('fs'),
    Web3 = require('web3'),
    Accounts = require('web3-eth-accounts'),
    Contract = require('web3-eth-contract');

var config = require('./config.json');

var abi = require('./abi.json');

Contract.setProvider(config.geth_node_ip);

var accounts = new Accounts(config.geth_node_ip);

var web3 = new Web3(config.geth_node_ip);

var contract = new Contract(abi, config.contract_address);

account = accounts.create();

console.log("Account address: " + account.address);

const { create } = require('ipfs-http-client');

const { Console } = require('console');

const client = create(config.ipfs_node_ip);

var app = express();

app.get('/', function(req, res) { 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<body>')
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit" value="send">');
    res.write('</form>');
    res.write('<form action="fileload" method="get" enctype="multipart/form-data">');
    res.write('<input type="submit" value="load">');
    res.write('</form>');
    res.write('</body>');
    return res.end();
})

app.post('/fileupload', async function (req, res) {
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', async function(fieldname, file, filename, encoding, mimetype) {
        const { cid } = await client.add(file);
        let encoded = contract.methods.insertHash(cid.toString()).encodeABI();
        let tx = {
            to: config.contract_address,
            gas: 100000,
            from: account.address,
            data: encoded
        }
        accounts.signTransaction(tx, account.privateKey, (err, res) => {
            if (!err) {
                web3.eth.sendSignedTransaction(res.rawTransaction, (err, tx) => {
                    console.log("Transaction hash: " + tx);
                });
            }
        });
    });
  
    busboy.on('finish', function() {
      res.writeHead(200, { 'Connection': 'close' });
      res.end("File uploaded");
    });
  
    return req.pipe(busboy);    
});

app.get('/fileload', async function (req, res) {
    contract.methods.getHash().call({'from': account.address}, async (err, cid) => {
        if (!err) {
            console.log("CID file: " + cid);
            data = []
            for await (const chunk of client.cat(cid)) {
                data.push(chunk);
            }
            buffer = Buffer.concat(data);
            return res.end(buffer);
        } else {
            console.log(error);
        }
    });
});

app.listen(8081)