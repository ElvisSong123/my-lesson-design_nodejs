/*
 * @Author: your name
 * @Date: 2020-03-24 09:05:22
 * @LastEditTime: 2020-03-25 13:53:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \毕业设计\server\api\apiCompany.js
 */
let mysql = require('./index.js')

function addCompanyInfo(sqlWord,callback){
    let connection = mysql();
    let query = "insert into company_info(operator_uuid,company_infos) values(?,?)";
    let uuid = JSON.parse(sqlWord).userid
    let params = [uuid,sqlWord];
    connection.query(query,params,(err,data)=>{
        if(err){
            callback(err)
        }else{ 
            callback(data)
        }
    })
    connection.end()
}

function editCompanyInfo(sqlWord,callback){
    let connection = mysql();
    let query = "update company_info set company_infos = ? where operator_uuid = ?";
    let uuid = JSON.parse(sqlWord).userid
    let params = [sqlWord,uuid];
    connection.query(query,params,(err,data)=>{
        if(err){
            callback(err)
        }else{ 
            callback(data)
        }
    })
    connection.end()
}

function getCompanyInfo(sqlWord,callback){
    let connection = mysql();
    let query = "select company_infos,company_develop from company_info where operator_uuid = ?";
    connection.query(query,sqlWord,(err,data)=>{
        if(err){
            callback(err)
        }else{ 
            callback(data)
        }
    })
    connection.end()
}

function addCompanyDevelop(sqlWord,callback){
    let connection = mysql();
    let query = "update company_info set company_develop = ? where operator_uuid = ?";
    console.log(sqlWord,'hahaha')
    let uuid = JSON.parse(sqlWord).userid
    let params = [sqlWord,uuid];
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

function saveImgFileName(sqlWord,callback){
    let connection = mysql();
    let query = "update company_info set company_img = ? where operator_uuid = ?";
    console.log(sqlWord,'hahaha');
    let uuid = sqlWord[1];
    let content = JSON.stringify(sqlWord[0]);
    let params = [content,uuid] 
    connection.query(query,params,(err,data)=>{
        if(err){
            callback(err)
        }else{ 
            callback(data)
        }
    })
    connection.end()

}

function addJobInfo(sqlWord,callback){
    let connection = mysql();
    
    let query = "update company_info set job_infos = ? where operator_uuid = ?";
    let uuid = JSON.parse(sqlWord).userid
    let params = [sqlWord,uuid];
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

function getJobInfo(sqlWord,callback){
    let connection = mysql();
    
    let query = "select job_infos from company_info where operator_uuid = ?";
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

module.exports = {
    addCompanyInfo,
    getCompanyInfo,
    editCompanyInfo,
    addCompanyDevelop,
    saveImgFileName,
    addJobInfo,
    getJobInfo
}