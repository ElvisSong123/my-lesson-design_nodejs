/*
 * @Author: your name
 * @Date: 2020-03-28 17:41:53
 * @LastEditTime: 2020-03-29 13:56:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \毕业设计\server\api\apiAnnounce.js
 */ 
let mysql = require('./index.js'); 
function getAnnounceInfo(sqlWord,callback){
    let connection = mysql(); 
    let query = "select * from public_announce where time between ? and ?"; 
    let params = [sqlWord.startChooseDate,sqlWord.endChooseDate];
    console.log(params)
    connection.query(query,params,(err,data)=>{
        if(err){
            callback(err)
        }else{ 
            callback(data)
        }
    })
    connection.end()
}

function deliverAnnounce(sqlWord,callback){
    let connection = mysql(); 
    // let query = "select * from public_announce where time between ? and ?"; 
    let query = "insert into public_announce(announce_title,announce_content,time,userid) values(?,?,?,?)";
    let params = [sqlWord.title,sqlWord.content,sqlWord.time,sqlWord.userid] 
    connection.query(query,params,(err,data)=>{
        if(err){
            callback(err);
            console.log(err)
        }else{ 
            callback(data)
        }
    })
    connection.end()
}
 
function getMyDelivetAnnounce(sqlWord,callback){
    let connection = mysql(); 
    let query = "select * from public_announce where userid = ?"; 
    connection.query(query,sqlWord,(err,data)=>{
        if(err){
            callback(err);
            console.log(err)
        }else{ 
            callback(data)
        }
    })
    connection.end()
}

function delAnnounce(sqlWord,callback){
    let connection = mysql(); 
    let query = "delete from public_announce where id = ?"; 
    connection.query(query,sqlWord,(err,data)=>{
        if(err){
            callback(err);
            console.log(err)
        }else{ 
            callback(data)
        }
    })
    connection.end()
}

module.exports = {
    getAnnounceInfo, 
    deliverAnnounce,
    getMyDelivetAnnounce,
    delAnnounce
}

