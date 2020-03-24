let mysql = require('./index.js')
function addPersonResume(sqlWord,callback){
    let connection = mysql();
    let query = '';
    let params = [sqlWord.operator,sqlWord.data]
    query ="insert into person_resume(operator,personinfo) values(?,?)"
    
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
    query ="select * from person_resume where operator = ?"
    
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
    let query = "update person_resume set personinfo = ? where operator = ?"
    let params = [sqlWord.data,sqlWord.operator]
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
    let query = "update person_resume set educationinfo = ? where operator = ?";
    let params = [sqlWord.data,sqlWord.operator];
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
    let query = "update person_resume set internshipinfo = ? where operator = ?";
    let params = [sqlWord.data,sqlWord.operator]
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
    query = "update person_resume set projectinfo = ? where operator = ?";
    let params = [sqlWord.data,sqlWord.operator];
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
    let query = "update person_resume set majorskill = ? where operator = ?";
    let params = [sqlWord.data,sqlWord.operator];
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
    let query = "update person_resume set introduce = ? where operator = ?";
    let params = [sqlWord.data,sqlWord.operator];
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