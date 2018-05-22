var pg = require('pg');
var conString = "postgres://TDInstaller:1234@localhost/TDInstaller";
var pgClient = new pg.Client(conString);

pgClient.connect(function (err, client) {
    if (err) {
        return console.error('error connect postgre', err);
    }
    console.log('connect success');
    
    client.query('SELECT * FROM "User"', [], function (err, result) {
        if (err) {
            return console.error('query error', err);
        }
        console.log('result:');
        console.log(result.rows);
        client.end();
    });


});