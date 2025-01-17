/*
 * @Author: your name
 * @Date: 2020-03-22 11:41:27
 * @LastEditTime: 2020-04-29 20:51:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \毕业设计\server\api\apiLoginRegister.js
 */
let mysql = require('./index.js')
function findUser(sqlWord,callback){
    let connection = mysql();
    let query = "select * from userlogin where user_id = ?;"
    connection.query(query,sqlWord,(err,data)=>{
        if(err){
            console.log(err)
            callback(err)
        }else{
            callback(data)
        }
    })
    connection.end()


}

function updateUser(sqlWord,callback){
    let connection = mysql();
    let query = '';
    let params;
    if(sqlWord.avatar){
        query = "update userlogin set password = ?, avatar = ? where user_id = ?"
        params = [sqlWord.password,sqlWord.avatar,sqlWord.username]
    }else{
        query = "update userlogin set password = ? where user_id = ?"
        params = [sqlWord.password,sqlWord.username]
    }
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

function operateUserSexAndMajor(sqlWord,callback){
    let connection = mysql();
    let query = '';
    let params;
    if(sqlWord.update && sqlWord.isSex){
        console.log(sqlWord,'haha')
        query = "update userlogin set sex = ? where user_id = ?"
        params = [sqlWord.sex,sqlWord.user_id];
    }else if(!sqlWord.update && sqlWord.isSex){
        query = "insert into userlogin(sex) values(?) where user_id = ?"
        params = [sqlWord.sex,sqlWord.user_id]
    }else if(sqlWord.update && sqlWord.isMajor){
        query = "update userlogin set major = ? where user_id = ?"
        params = [sqlWord.major,sqlWord.user_id]
    }else if(!sqlWord.update && sqlWord.isMajor){
        query = "insert into userlogin(major) values(?) where user_id = ?"
        params = [sqlWord.major,sqlWord.user_id]
    }
    connection.query(query,params,(err,data)=>{
        if(err){
            console.log(err)
            callback(err)
        }else{ 
            callback()
        }
    })
    callback();
    connection.end()
}

function applyCount(sqlWord,callback){
    let connection = mysql();
    let query = "insert into userapply(name,number,email,status,apply_time) values(?,?,?,?,?)";
    let params = [sqlWord.name,sqlWord.number,sqlWord.email,sqlWord.status,sqlWord.applyTime]
    connection.query(query,params,(err,data)=>{
        if(err){
            callback(err)
        }else{ 
            callback(data)
        }
    })
    connection.end()
}

function getapplyCount(sqlWord,callback){
    let connection = mysql();
    let query = "select * from userapply";
    connection.query(query,(err,data)=>{
        if(err){
            callback(err)
        }else{ 
            callback(data)
        }
    })
    connection.end()
}

function delapplyCount(sqlWord,callback){
    let connection = mysql();
    let query = "delete from userapply where number = ?";
    connection.query(query,sqlWord,(err,data)=>{
        if(err){
            callback(err)
        }else{ 
            callback(data)
        }
    })
    connection.end()
}

function getAllUser(sqlWord,callback){
    let connection = mysql();
    let query = "select username,status,user_id,email from userlogin where (major = ? or ? = '') and (status = ? or ? = '') limit ?,?";
    let params = [sqlWord.major,sqlWord.major,sqlWord.statusValue,sqlWord.statusValue,sqlWord.nowPage,sqlWord.pageCount];
    connection.query(query,params,(err,data)=>{
        if(err){
            callback(err)
        }else{ 
            callback(data)
        }
    })
    connection.end()
}

function getAllUserNotByPage(sqlWord,callback){
    let connection = mysql();
    let query = "select user_id from userlogin"; 
    connection.query(query,(err,data)=>{
        if(err){
            callback(err)
        }else{ 
            callback(data)
        }
    })
    connection.end()
}

function getAllUserCount (sqlWord,callback){
    let connection = mysql();
    let query = "select count(1) from userlogin where (major like ? or ? = '') and (status = ? or ? = '')";
    let params = [`%${sqlWord.major}%`,sqlWord.major,sqlWord.statusValue,sqlWord.statusValue];
    connection.query(query,params,(err,data)=>{
        if(err){
            callback(err)
        }else{ 
            callback(data)
        }
    })
    connection.end()
}
function addUserApply(sqlWord,callback){
    let connection = mysql();
    let query = "insert into userlogin(username,password,status,user_id,email) values(?,?,?,?,?)";
    let params = [sqlWord.name,sqlWord.number,sqlWord.status,sqlWord.number,sqlWord.email]
    connection.query(query,params,(err,data)=>{
        if(err){
            callback(err)
        }else{ 
            callback(data)
        }
    })
    connection.end()
}


function judgeLogin(sqlWord,callback){
    let connection = mysql();
    let query = "select * from session_tab where session_id = ?";
    connection.query(query,sqlWord,(err,data)=>{
        if(err){
            callback(err)
        }else{ 
            callback(data)
        }
    })
    connection.end()
}

function signOutLogin(sqlWord,callback){
    let connection = mysql();
    connection.query("delete from session_tab where session_id = '" + sqlWord + "'",(err,data)=>{
        if(err){
            callback(err)
        }else{ 
            callback(data)
        }
    })
    connection.end()
}

function getAllStudentCount(sqlWord,callback){
    let connection = mysql();
    let query = "select count(1) from userlogin where status = '学生' and (sex = ? or ? = '') and (major like ? or ? = '')"
    connection.query(query,[sqlWord.sex,sqlWord.sex,`%${sqlWord.major}%`,sqlWord.major],(err,data)=>{
        if(err){
            callback(err)
        }else{ 
            callback(data)
        }
    })
    connection.end()
}


module.exports = {
    findUser,
    updateUser,
    applyCount,
    judgeLogin,
    signOutLogin,
    getapplyCount,
    getAllUser,
    addUserApply,
    delapplyCount,
    getAllStudentCount,
    operateUserSexAndMajor,
    getAllUserCount,
    getAllUserNotByPage
}