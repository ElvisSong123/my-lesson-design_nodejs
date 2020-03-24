const mysql = require('mysql')

module.exports = ()=>{
    let sqlConnect = mysql.createConnection({
        host:'127.0.0.1',
        port:'3306',
        user:'root',
        password:'s09222393b',
        database:'user'
    })
    return sqlConnect;
};