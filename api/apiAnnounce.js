/*
 * @Author: your name
 * @Date: 2020-03-28 17:41:53
 * @LastEditTime: 2020-03-28 19:52:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \毕业设计\server\api\apiAnnounce.js
 */ 
let mysql = require('./index.js'); 
function getAnnounceInfo(sqlWord,callback){
    let connection = mysql(); 
    // let query = "select * from public_announce where time between ? and ?"; 
    let query = "select * from public_announce"; 
    connection.query(query,sqlWord,(err,data)=>{
        if(err){
            callback(err)
        }else{ 
            callback(data)
        }
    })
    connection.end()
}
 

module.exports = {
    getAnnounceInfo, 
}

