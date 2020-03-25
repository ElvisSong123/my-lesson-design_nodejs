/*
 * @Author: your name
 * @Date: 2020-03-25 14:09:44
 * @LastEditTime: 2020-03-25 22:40:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \毕业设计\server\router\jobRouter.js
 */
let sqlFunc = require('../api/apiJob.js')
let fs = require('fs');
let url = require('url')

module.exports = (app) => {

    app.post('/addJobInfo',(req,res)=>{
        let params = req.body; 
        sqlFunc.addJobInfo(params,(data)=>{
            if(data.affectedRows){
                res.send(JSON.stringify({
                    statusCode: 200,
                    message: '保存成功'
                }));
            }else{
                console.log(data)
                res.send(JSON.stringify({
                    statusCode: 500,
                    message: '服务器错误'
                }));
            }
        })
    })

    app.post('/getJobInfo',(req,res)=>{
        let params = req.body;
        sqlFunc.getJobInfo(JSON.stringify(params),(data)=>{
            if(data.length){
                res.send(JSON.stringify({
                    data
                }));
            }else{
                console.log(data)
                res.send(JSON.stringify({
                    statusCode: 500,
                    message: '服务器错误'
                }));
            }
        })
    })

    app.post('/delJobInfo',(req,res)=>{
        let params = req.body.data;
        sqlFunc.delJobInfo(params,(data)=>{
            if(data){
                res.send({
                    statusCode:200
                });
            }else{
                console.log(data)
                res.send(JSON.stringify({
                    statusCode: 500,
                    message: '服务器错误'
                }));
            }
        })
    })

    app.post('/editJobInfo',(req,res)=>{
        let {jobId,...reset} = req.body.data;
        console.log(jobId,reset)
        sqlFunc.editJobInfo([JSON.stringify(reset),jobId],(data)=>{
            if(data){
                res.send({
                    statusCode:200
                });
            }else{
                console.log(data)
                res.send(JSON.stringify({
                    statusCode: 500,
                    message: '服务器错误'
                }));
            }
        })
    })

    app.post('/getJobInfoByPage',(req,res)=>{ 
        console.log(req.body)
        let {nowPage,pageCount} = req.body.data;
        nowPage = (nowPage - 1) * pageCount;
        console.log(nowPage,pageCount)
        sqlFunc.getJobInfoByPage([nowPage,pageCount],(data)=>{
            if(data){
                res.send({
                    statusCode:200,
                    data
                });
            }else{
                console.log(data)
                res.send(JSON.stringify({
                    statusCode: 500,
                    message: '服务器错误'
                }));
            }
        })
    })

    app.post('/getJobDataCount',(req,res)=>{ 
        sqlFunc.getJobDataCount([],(data)=>{
            if(data){
                res.send({
                    statusCode:200,
                    data
                });
            }else{
                console.log(data)
                res.send(JSON.stringify({
                    statusCode: 500,
                    message: '服务器错误'
                }));
            }
        })
    })
}