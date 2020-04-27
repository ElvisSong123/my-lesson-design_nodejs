/*
 * @Author: your name
 * @Date: 2020-03-25 13:53:29
 * @LastEditTime: 2020-04-27 15:00:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \毕业设计\server\api\apiJob.js
 */
let mysql = require('./index.js');
let uuid = require('uuid');
let uuidv1 = uuid.v1;
function addJobInfo(sqlWord,callback){
    let connection = mysql();
    const job_id = uuidv1().replace(/-/g, '');
    const corp_id = sqlWord.userid;
    const job_detail = sqlWord.data;
    const job_name = job_detail.jobName;
    const job_address = job_detail.address;
    const company_name = job_detail.name;
    let query = "insert into job_info(job_id,corp_id,job_detail,job_name,job_address,company_name) values(?,?,?,?,?,?)";
    let params = [job_id,corp_id,JSON.stringify(job_detail),job_name,job_address,company_name];
    connection.query(query,params,(err,data)=>{
        if(err){
            callback(err)
        }else{ 
            callback(data)
        }
    })
    connection.end()
}

function getJobInfo(sqlWord,callback){
    let connection = mysql();
    let query = "select * from job_info where corp_id = ?";
    let uuid = JSON.parse(sqlWord).userid;
    connection.query(query,uuid,(err,data)=>{
        if(err){
            callback(err)
        }else{ 
            callback(data)
        }
    })
    connection.end()
}

function editJobInfo(sqlWord,callback){
    let connection = mysql();
    let query = "update job_info set job_detail = ? , job_name = ? , job_address = ? , company_name = ? where job_id = ?";  
    const job_name = JSON.parse(sqlWord[0]).jobName;
    const job_address = JSON.parse(sqlWord[0]).address;
    const company_name = JSON.parse(sqlWord[0]).name;
    
    let params = [sqlWord[0],job_name,job_address,company_name,sqlWord[1]]; 
    connection.query(query,params,(err,data)=>{
        if(err){
            console.log(err)
            callback(err)
        }else{ 
            callback(data)
        }
    })
    connection.end()
}

function delJobInfo(sqlWord,callback){
    let connection = mysql();
    let query = "delete from job_info where job_id = ?;";
    connection.query(query,sqlWord,(err,data)=>{
        if(err){
            callback(err)
        }else{ 
            callback(data)
        }
    })
    connection.end()
}

function getJobInfoByPage(sqlWord,callback){
    let connection = mysql();
    let query = "select * from job_info limit ?,?";
    connection.query(query,sqlWord,(err,data)=>{
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

function searchJobInfo(sqlWord,callback){
    let connection = mysql();
    let query = "select * from job_info where (job_name like ?  or ? = '') and (job_address like ? or ? = '') and (company_name like ? or ? = '') limit ?,?";
    let params = [`%${sqlWord.job}%`,sqlWord.job,`%${sqlWord.place}%`,sqlWord.place,`%${sqlWord.name}%`,sqlWord.name,sqlWord.nowPage,sqlWord.pageCount]
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

function getJobDataCount(sqlWord,callback){
    let connection = mysql();
    let query = "select count(1) from job_info where (job_name like ?  or ? = '') and (job_address like ? or ? = '') and (company_name like ? or ? = '')";
    let params = [`%${sqlWord.job}%`,sqlWord.job,`%${sqlWord.place}%`,sqlWord.place,`%${sqlWord.name}%`,sqlWord.name]
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
    addJobInfo,
    getJobInfo,
    editJobInfo,
    delJobInfo,
    getJobInfoByPage,
    getJobDataCount,
    searchJobInfo
}

