let mysql = require('./index.js')
function addPersonResume(sqlWord,callback){
    let connection = mysql();
    let query = '';
    query ="insert into person_resume(operator,personinfo) values('"+ sqlWord.operator +"','"+sqlWord.data+"')"
    
    connection.query(query,(err,data)=>{
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
    query ="select * from person_resume where operator = '" + sqlWord + "'"
    
    connection.query(query,(err,data)=>{
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
    let query = '';
    query = "update person_resume set personinfo = '" + sqlWord.data + "' where operator = '" + sqlWord.operator + "'"
    
    connection.query(query,(err,data)=>{
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
    let query = '';
    query = "update person_resume set educationinfo = '" + sqlWord.data + "' where operator = '" + sqlWord.operator + "'"
    
    connection.query(query,(err,data)=>{
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
    let query = '';
    query = "update person_resume set internshipinfo = '" + sqlWord.data + "' where operator = '" + sqlWord.operator + "'"
    connection.query(query,(err,data)=>{
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
    query = "update person_resume set projectinfo = '" + sqlWord.data + "' where operator = '" + sqlWord.operator + "'"
    connection.query(query,(err,data)=>{
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
    let query = '';
    query = "update person_resume set majorskill = '" + sqlWord.data + "' where operator = '" + sqlWord.operator + "'"
    connection.query(query,(err,data)=>{
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
    let query = '';
    query = "update person_resume set introduce = '" + sqlWord.data + "' where operator = '" + sqlWord.operator + "'"
    connection.query(query,(err,data)=>{
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