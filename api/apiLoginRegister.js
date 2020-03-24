let mysql = require('./index.js')
function findUser(sqlWord,callback){
    let connection = mysql();
    let query = "select * from userlogin where username = ?;"
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
        query = "update userlogin set password = ?, avatar = ? where username = ?"
        params = [sqlWord.password,sqlWord.avatar,sqlWord.username]
    }else{
        query = "update userlogin set password = ? where username = ?"
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

function applyCount(sqlWord,callback){
    let connection = mysql();
    let query = "insert into userapply(name,number,email) values(?,?,?)";
    let params = [sqlWord.name,sqlWord.number,sqlWord.email]
    connection.query(query,(err,data)=>{
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

// function uploadAvatar(sqlWord,callback){
//     let connection = mysql();
//     connection.query("insert into userlogin(avatar) values('"+ sqlWord +"') ",(err,data)=>{
//         if(err){
//             callback(err)
//         }else{ 
//             callback(data)
//         }
//     })
//     connection.end()
// }

module.exports = {
    findUser,
    updateUser,
    applyCount,
    judgeLogin,
    signOutLogin,
}