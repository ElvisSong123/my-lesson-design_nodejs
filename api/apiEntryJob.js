/*
 * @Author: your name
 * @Date: 2020-03-28 11:35:19
 * @LastEditTime: 2020-03-28 22:25:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \毕业设计\server\api\apiEntryJob.js
 */

let mysql = require('./index.js'); 
function confirmEnetryJob(sqlWord,callback){
    let connection = mysql();
    console.log(sqlWord,'hahaha')
    let query = "insert into entry_job(student_name,student_id,email,company_id,company_name,job_name,job_id,sex,major) values(?,?,?,?,?,?,?,?,?)";
    connection.query(query,sqlWord,(err,data)=>{
        if(err){
            callback(err)
        }else{ 
            callback(data)
        }
    })
    connection.end()
}

function getEnetryJob(sqlWord,callback){
    let connection = mysql();
    let query = "select * from entry_job where student_id = ?";
    connection.query(query,sqlWord,(err,data)=>{
        if(err){
            callback(err)
        }else{ 
            callback(data)
        }
    })
    connection.end()
}

function getEnetryJobByCompanyId(sqlWord,callback){
    let connection = mysql();
    let query = "select * from entry_job where company_id = ?";
    connection.query(query,sqlWord,(err,data)=>{
        if(err){
            callback(err)
        }else{ 
            callback(data)
        }
    })
    connection.end()
}

function updateEntryJob(sqlWord,callback){
    let connection = mysql();
    let query = "update entry_job set company_name = ? , job_name = ? where student_id = ?";
    console.log(sqlWord,'jajaja')
    let params = [sqlWord.company_name,sqlWord.deliver_jobname,sqlWord.userid]
    connection.query(query,params,(err,data)=>{
        if(err){
            callback(err)
            console.log(err)
        }else{ 
            callback(data)
        }
    })
    connection.end()
}

function delEntryJob(sqlWord,callback){
    let connection = mysql();
    let query = "delete from entry_job where student_id = ?";  
    connection.query(query,sqlWord,(err,data)=>{
        if(err){
            callback(err)
            console.log(err)
        }else{ 
            callback(data)
        }
    })
    connection.end()
}

function getEntryStudentByPage(sqlWord,callback){
    let connection = mysql();
    let query = "select * from entry_job where (sex = ?  or ? = '') and (major = ? or ? = '') limit ?,?";
    let params = [sqlWord.sex,sqlWord.sex,sqlWord.major,sqlWord.major,sqlWord.nowPage,sqlWord.pageCount]
    connection.query(query,params,(err,data)=>{
        if(err){
            console.log(err)
            callback(err)
        }else{ 
            console.log(data)
            callback(data)
        }
    })
    connection.end()
}

function getEntryStudentCount(sqlWord,callback){
    let connection = mysql();
    let query = "select count(1) from entry_job where (sex = ?  or ? = '') and (major = ? or ? = '')";
    let params = [sqlWord.sex,sqlWord.sex,sqlWord.major,sqlWord.major]
    connection.query(query,params,(err,data)=>{
        if(err){
            console.log(err)
            callback(err)
        }else{ 
            console.log(data)
            callback(data)
        }
    })
    connection.end()
}


module.exports = {
    confirmEnetryJob,
    getEnetryJob,
    getEnetryJobByCompanyId,
    updateEntryJob,
    delEntryJob,
    getEntryStudentByPage,
    getEntryStudentCount
}

