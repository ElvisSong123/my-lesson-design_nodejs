/*
 * @Author: your name
 * @Date: 2020-03-27 13:14:41
 * @LastEditTime: 2020-03-27 14:13:27
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





module.exports = {
    addDeliverResume,
    getDeliverResume
}

