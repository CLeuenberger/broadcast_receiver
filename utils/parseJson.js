let parse = function(postJSON){
    let testData = {
        blockchain: postJSON.data.blockchain,
        currentBlock: postJSON.data.currentBlock,
        status: postJSON.data.transactions[0].status,
        ethos_transaction_UUID: postJSON.data.transactions[0].ethos_transaction_UUID,
        transaction_hash: postJSON.data.transactions[0].transaction_hash
        }
    return testData
}

module.exports = {
    parse: parse
}