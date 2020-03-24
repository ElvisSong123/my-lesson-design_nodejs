let sqlFunc = require('../api/apiResume.js')
let fs = require('fs');
let url = require('url')

module.exports = (app, md5, upload) => {
    app.post('/addPersonData', function (req, res) {
        const username = req.body
        let sqlWord = {
            operator:req.body.operator,
            data: JSON.stringify(req.body) 
        }

        sqlFunc.addPersonResume(sqlWord,(data)=>{ 
            if(data.affectedRows){
                res.send(JSON.stringify({
                    statusCode: 200,
                    message: '保存成功'
                }));
            }else{
                res.send(JSON.stringify({
                    statusCode: 500,
                    message: '服务器错误'
                }));
            }
        })

    })

    app.post('/getResumeData', function (req, res) {
       
        let sqlWord = req.body.operator;
    

        sqlFunc.findPersonResume(sqlWord,(data)=>{
            if(data.length){
                res.send(JSON.stringify({
                    statusCode: 200,
                    message: '保存成功',
                    data:data[0]
                }));
            }else{
                res.send(JSON.stringify({
                    statusCode: 500,
                    message: '服务器错误'
                }));
            }
        })

    })
 
    app.post('/editPersonData', function (req, res) {
       
        let sqlWord = {
            operator:req.body.operator,
            data: JSON.stringify(req.body) 
        }

        sqlFunc.editPersonResume(sqlWord,(data)=>{
            console.log(data,124)
            if(data.affectedRows){
                res.send(JSON.stringify({
                    statusCode: 200,
                    message: '修改成功'
                }));
            }else{
                res.send(JSON.stringify({
                    statusCode: 500,
                    message: '服务器错误'
                }));
            }
        })

    })

    app.post('/addEducationInfo', function (req, res) {
       
        let sqlWord = {
            operator:req.body.operator,
            data: JSON.stringify(req.body) 
        }
        console.log(sqlWord)

        sqlFunc.addEducationInfo(sqlWord,(data)=>{
            console.log(data,124)
            if(data.affectedRows){
                res.send(JSON.stringify({
                    statusCode: 200,
                    message: '保存成功'
                }));
            }else{
                res.send(JSON.stringify({
                    statusCode: 500,
                    message: '服务器错误'
                }));
            }
        })

    })
    app.post('/eidtEducationInfo', function (req, res) {
       
        let sqlWord = {
            operator:req.body.operator,
            data: JSON.stringify(req.body) 
        }
        console.log(sqlWord)

        sqlFunc.addEducationInfo(sqlWord,(data)=>{
            console.log(data,124)
            if(data.affectedRows){
                res.send(JSON.stringify({
                    statusCode: 200,
                    message: '修改成功'
                }));
            }else{
                res.send(JSON.stringify({
                    statusCode: 500,
                    message: '服务器错误'
                }));
            }
        })

    })

    app.post('/addInternshipInfo', function (req, res) {
       
        let sqlWord = {
            operator:req.body.operator,
            data: JSON.stringify(req.body) 
        }
        console.log(sqlWord)

        sqlFunc.addInternshipInfo(sqlWord,(data)=>{
            console.log(data,124)
            if(data.affectedRows){
                res.send(JSON.stringify({
                    statusCode: 200,
                    message: '保存成功'
                }));
            }else{
                res.send(JSON.stringify({
                    statusCode: 500,
                    message: '服务器错误'
                }));
            }
        })

    })
    app.post('/editInternshipInfo', function (req, res) {
       
        let sqlWord = {
            operator:req.body.operator,
            data: JSON.stringify(req.body) 
        }
        console.log(sqlWord)

        sqlFunc.addInternshipInfo(sqlWord,(data)=>{
            console.log(data,124)
            if(data.affectedRows){
                res.send(JSON.stringify({
                    statusCode: 200,
                    message: '修改成功'
                }));
            }else{
                res.send(JSON.stringify({
                    statusCode: 500,
                    message: '服务器错误'
                }));
            }
        })

    })

    
    app.post('/addProjectInfo', function (req, res) {
       
        let sqlWord = {
            operator:req.body.operator,
            data: JSON.stringify(req.body) 
        }
        console.log(sqlWord)

        sqlFunc.addProjectInfo(sqlWord,(data)=>{
            console.log(data,124)
            if(data.affectedRows){
                res.send(JSON.stringify({
                    statusCode: 200,
                    message: '保存成功'
                }));
            }else{
                res.send(JSON.stringify({
                    statusCode: 500,
                    message: '服务器错误'
                }));
            }
        })

    })
    app.post('/editProjectInfo', function (req, res) {
       
        let sqlWord = {
            operator:req.body.operator,
            data: JSON.stringify(req.body) 
        }
        console.log(sqlWord)

        sqlFunc.addProjectInfo(sqlWord,(data)=>{
            console.log(data,124)
            if(data.affectedRows){
                res.send(JSON.stringify({
                    statusCode: 200,
                    message: '修改成功'
                }));
            }else{
                res.send(JSON.stringify({
                    statusCode: 500,
                    message: '服务器错误'
                }));
            }
        })

    })

    app.post('/addMajorInfo', function (req, res) {
       
        let sqlWord = {
            operator:req.body.operator,
            data: JSON.stringify(req.body) 
        }
        console.log(sqlWord)

        sqlFunc.addMajorInfo(sqlWord,(data)=>{ 
            if(data.affectedRows){
                res.send(JSON.stringify({
                    statusCode: 200,
                    message: '保存成功'
                }));
            }else{
                res.send(JSON.stringify({
                    statusCode: 500,
                    message: '服务器错误'
                }));
            }
        })

    })
    app.post('/editMajorInfo', function (req, res) {
       
        let sqlWord = {
            operator:req.body.operator,
            data: JSON.stringify(req.body) 
        }
        console.log(sqlWord)

        sqlFunc.addMajorInfo(sqlWord,(data)=>{ 
            if(data.affectedRows){
                res.send(JSON.stringify({
                    statusCode: 200,
                    message: '修改成功'
                }));
            }else{
                res.send(JSON.stringify({
                    statusCode: 500,
                    message: '服务器错误'
                }));
            }
        })

    })

    app.post('/addIntroduce', function (req, res) {
       
        let sqlWord = {
            operator:req.body.operator,
            data: JSON.stringify(req.body) 
        }
        console.log(sqlWord)

        sqlFunc.addIntroduce(sqlWord,(data)=>{ 
            if(data.affectedRows){
                res.send(JSON.stringify({
                    statusCode: 200,
                    message: '修改成功'
                }));
            }else{
                res.send(JSON.stringify({
                    statusCode: 500,
                    message: '服务器错误'
                }));
            }
        })

    })
    app.post('/editIntroduce', function (req, res) {
       
        let sqlWord = {
            operator:req.body.operator,
            data: JSON.stringify(req.body) 
        }
        console.log(sqlWord)

        sqlFunc.addIntroduce(sqlWord,(data)=>{ 
            if(data.affectedRows){
                res.send(JSON.stringify({
                    statusCode: 200,
                    message: '修改成功'
                }));
            }else{
                res.send(JSON.stringify({
                    statusCode: 500,
                    message: '服务器错误'
                }));
            }
        })

    })
}