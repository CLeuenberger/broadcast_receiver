const sql = require('sqlite3').verbose();
db = new sql.Database('db.sqlite');
db.run("DROP TABLE IF EXISTS broadcasts")
console.log("table dropped")