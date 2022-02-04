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
            "status TEXT," +
            "ethos_transaction_UUID TEXT," +
            "user_id TEXT," +
            "coin_symbol TEXT," +
            "ethos_coin_id TEXT," +
            "transaction_hash," +
            "quantity NUM," +
            "timestamp NUM," +
            "wallet_id TEXT," +
            "wallet_holding_id TEXT," +
            "wallet_type TEXT," +
            "direction TEXT," +
            "user_address TEXT," +
            "user_address_UUID TEXT," +
            "external_address TEXT," +
            "block_number NUM," +
            "confirmations NUM," +
            "blocks_until_secured NUM," +
            "txn_fee TEXT," +
            "cursor TEXT)");
    });
}

let write_table = function(body) {
    db.serialize(() => {
        const {
            status,
            ethos_transaction_UUID,
            user_id,
            coin_symbol,
            ethos_coin_id,
            transaction_hash,
            quantity,
            timestamp,
            wallet_id,
            wallet_holding_id,
            wallet_type,
            direction,
            user_address,
            user_address_UUID,
            external_address,
            block_number,
            confirmations,
            blocks_until_secured,
            txn_fee,
            cursor
        } = body
        const stmt = db.prepare('INSERT INTO broadcasts (' +
            'status, ' +
            'ethos_transaction_UUID, ' +
            'user_id, ' +
            'coin_symbol, ' +
            'ethos_coin_id,' +
            'transaction_hash,' +
            'quantity, ' +
            'timestamp, ' +
            'wallet_id,' +
            'wallet_holding_id,' +
            'wallet_type,' +
            'direction,' +
            'user_address,' +
            'user_address_UUID,' +
            'external_address,' +
            'block_number,' +
            'confirmations,' +
            'blocks_until_secured,' +
            'txn_fee,' +
            'cursor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        stmt.run(
            status,
            ethos_transaction_UUID,
            user_id,
            coin_symbol,
            ethos_coin_id,
            transaction_hash,
            quantity,
            timestamp,
            wallet_id,
            wallet_holding_id,
            wallet_type,
            direction,
            user_address,
            user_address_UUID,
            external_address,
            block_number,
            confirmations,
            blocks_until_secured,
            txn_fee,
            cursor);
        stmt.finalize();
        // res.status(200).json({respond: req.body});
    })
}
module.exports = {
    create_table: create_table,
    write_table: write_table

}