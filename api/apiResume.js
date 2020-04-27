let mysql = require('./index.js')
function addPersonResume(sqlWord,callback){
    let connection = mysql();
    let query = '';
    let params = [sqlWord.operator,sqlWord.data,sqlWord.user_id]
    query ="insert into person_resume(operator,personinfo,userid) values(?,?,?)"
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


function findPersonResume(sqlWord,callback){
    let connection = mysql();
    let query = '';
    query ="select * from person_resume where userid = ?"
    
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

function editPersonResume(sqlWord,callback){
    let connection = mysql();
    let query = "update person_resume set personinfo = ? where userid = ?"
    let params = [sqlWord.data,sqlWord.userid]
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
function addEducationInfo(sqlWord,callback){
    let connection = mysql();
    let query = "update person_resume set educationinfo = ? where userid = ?";
    let params = [sqlWord.data,sqlWord.userid];
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

function addInternshipInfo(sqlWord,callback){
    let connection = mysql();
    let query = "update person_resume set internshipinfo = ? where userid = ?";
    let params = [sqlWord.data,sqlWord.userid]
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

function addProjectInfo(sqlWord,callback){
    let connection = mysql();
    let query = '';
    query = "update person_resume set projectinfo = ? where userid = ?";
    let params = [sqlWord.data,sqlWord.userid];
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

function addMajorInfo(sqlWord,callback){
    let connection = mysql();
    let query = "update person_resume set majorskill = ? where userid = ?";
    let params = [sqlWord.data,sqlWord.userid];
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

function addIntroduce(sqlWord,callback){
    let connection = mysql();
    let query = "update person_resume set introduce = ? where userid = ?";
    let params = [sqlWord.data,sqlWord.userid];
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
    addPersonResume,
    findPersonResume,
    editPersonResume,
    addEducationInfo,
    addInternshipInfo,
    addProjectInfo,
    addMajorInfo,
    addIntroduce
}