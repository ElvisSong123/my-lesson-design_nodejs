/*
 * @Author: your name
 * @Date: 2020-03-27 13:14:41
 * @LastEditTime: 2020-04-27 14:56:02
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
    let query = "insert into deliver_resume(company_id,job_id,deliver_address,deliver_jobname,company_name,user_id,resume_data,deliver_state) values(?,?,?,?,?,?,?,?)";
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
    let query = "select * from deliver_resume where company_id = ? and (deliver_address like ?  or ? = '') and (deliver_jobname like ? or ? = '')  limit ?,?";
    let params = [sqlWord.userid,`%${sqlWord.place}%`,sqlWord.place,`%${sqlWord.jobName}%`,sqlWord.jobName,sqlWord.nowPage,sqlWord.pageCount]
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
    let query = "select count(1) from deliver_resume where company_id = ? and (deliver_address like ?  or ? = '') and (deliver_jobname like ? or ? = '')";
    let params = [sqlWord.userid,`%${sqlWord.place}%`,sqlWord.place,`%${sqlWord.jobName}%`,sqlWord.jobName]
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

function changeCandidateState(sqlWord,callback){
    let connection = mysql();
    let query = "update deliver_resume set deliver_state = ? where job_id = ? and user_id = ?";
    let params = [sqlWord.state,sqlWord.jobId,sqlWord.userId]
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

function getDeliverFeedback(sqlWord,callback){
    let connection = mysql();  
    console.log(sqlWord,'hello')
    let query = "select deliver_address,deliver_jobname,deliver_state,company_name,company_id,job_id from deliver_resume where user_id = ?";
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
    addDeliverResume,
    getDeliverResume,
    searchCandidateInfo,
    searchCandidateCount,
    changeCandidateState,
    getDeliverFeedback
}

