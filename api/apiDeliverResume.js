/*
 * @Author: your name
 * @Date: 2020-03-27 13:14:41
 * @LastEditTime: 2020-03-27 16:11:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \毕业设计\server\api\apiDeliverResume.js
 */
/*
 * @Author: your name
 * @Date: 2020-03-25 13:53:29
 * @LastEditTime: 2020-03-26 23:14:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \毕业设计\server\api\apiJob.js
 */
let mysql = require('./index.js');  
function addDeliverResume(sqlWord,callback){
    let connection = mysql();  
    let query = "insert into deliver_resume(company_id,job_id,deliver_address,deliver_jobname,user_id,resume_data) values(?,?,?,?,?,?)";
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

function getDeliverResume(sqlWord,callback){
    let connection = mysql();  
    let query = "select job_id from deliver_resume where user_id = ?";
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

function searchCandidateInfo(sqlWord,callback){
    let connection = mysql();
    let query = "select * from deliver_resume where company_id = ? and (deliver_address = ?  or ? = '') and (deliver_jobname = ? or ? = '')  limit ?,?";
    let params = [sqlWord.userid,sqlWord.place,sqlWord.place,sqlWord.jobName,sqlWord.jobName,sqlWord.nowPage,sqlWord.pageCount]
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

function searchCandidateCount(sqlWord,callback){
    let connection = mysql();
    console.log(sqlWord)
    let query = "select count(1) from deliver_resume where company_id = ? and (deliver_address = ?  or ? = '') and (deliver_jobname = ? or ? = '')";
    let params = [sqlWord.userid,sqlWord.place,sqlWord.place,sqlWord.jobName,sqlWord.jobName]
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




module.exports = {
    addDeliverResume,
    getDeliverResume,
    searchCandidateInfo,
    searchCandidateCount
}

