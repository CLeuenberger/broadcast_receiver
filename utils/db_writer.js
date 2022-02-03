const sql = require('sqlite3').verbose();


let create_table = function(){
    const db_port = process.env.NODE_ENV === 'test' ? 3001 : 3000;
    if (process.env.MODE === 'test') {
        db = new sql.Database(':memory:');
    }
    else {
        db = new sql.Database('db.sqlite');
    }
    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS broadcasts " +
            "(id INTEGER PRIMARY KEY, " +
            "blockchain NUM," +
            "currentBlock NUM," +
            "status TEXT," +
            "ethos_transaction_UUID TEXT," +
            "transaction_hash," +
            "ethos_coin_id TEXT," +
            "coin_symbol TEXT," +
            "quantity NUM," +
            "txn_fee NUM," +
            "wallet_id TEXT," +
            "wallet_holding_id TEXT," +
            "user_id TEXT," +
            "user_address_UUID TEXT," +
            "user_address TEXT," +
            "wallet_type TEXT," +
            "direction TEXT," +
            "external_address TEXT," +
            "timestamp NUM," +
            "block_number NUM," +
            "cursor TEXT," +
            "confirmations NUM," +
            "blocks_until_secured NUM," +
            "destination TEXT," +
            "type NUM)");
    });
}

let write_table = function(body) {
    db.serialize(() => {
        const {
            blockchain,
            currentBlock,
        } = body.data
        const {
            status,
            ethos_transaction_UUID,
            transaction_hash,
            ethos_coin_id,
            coin_symbol,
            quantity,
            txn_fee,
            wallet_id,
            wallet_holding_id,
            user_id,
            user_address_UUID,
            user_address,
            wallet_type,
            direction,
            external_address,
            timestamp,
            block_number,
            cursor,
            confirmations,
            blocks_until_secured
        } = body.data.transactions[0];
        const {
            destination, type
        } = body
        const stmt = db.prepare('INSERT INTO broadcasts (' +
            'blockchain, ' +
            'currentBlock, ' +
            'status, ' +
            'ethos_transaction_UUID, ' +
            'transaction_hash,' +
            'ethos_coin_id,' +
            'coin_symbol, ' +
            'quantity, ' +
            'txn_fee,' +
            'wallet_id,' +
            'wallet_holding_id,' +
            'user_id,' +
            'user_address_UUID,' +
            'user_address,' +
            'wallet_type,' +
            'direction,' +
            'external_address,' +
            'timestamp,' +
            'block_number,' +
            'cursor,' +
            'confirmations,' +
            'blocks_until_secured,' +
            'destination,' +
            'type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        stmt.run(
            blockchain,
            currentBlock,
            status,
            ethos_transaction_UUID,
            transaction_hash,
            ethos_coin_id,
            coin_symbol,
            quantity,
            txn_fee,
            wallet_id,
            wallet_holding_id,
            user_id,
            user_address_UUID,
            user_address,
            wallet_type,
            direction,
            external_address,
            timestamp,
            block_number,
            cursor,
            confirmations,
            blocks_until_secured,
            destination,
            type);
        stmt.finalize();
        // res.status(200).json({respond: req.body});
    })
}
module.exports = {
    create_table: create_table,
    write_table: write_table

}