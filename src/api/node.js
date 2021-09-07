/**\
 * node专属方法
 */

const fs = require('fs')
const http = require('http')
const url = require('url')
// console.log(http)

const mysql = require('mysql')
// console.log(mysql)
const mysqlConnect = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'990823',
    database:'mysql',
    port:3306
})
// console.log(mysqlConnect)

mysqlConnect.connect((err) => {
    if (err) {
        console.log('[query] - :' + err);
        return;
    }
    console.log('[connection connect]  succeed!');
});

let sql = 'SELECT * FROM test_userList WHERE id = 1';
let returnData = null
mysqlConnect.query(sql, (err, result) => {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
    returnData = result
   console.log('--------------------------SELECT----------------------------');
   console.log(result);
   console.log('------------------------------------------------------------\n\n');  
});

http.createServer((req,res) => {
    if(req.method == 'POST' && req.path == '/'){
        console.log(req)
        let data = {
            retCode: 200,
            msg:'成功',
            data: returnData
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain;charset=utf-8');
        res.end(JSON.stringify(data))
    }
}).listen(8088)
