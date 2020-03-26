/*
 * @Author: your name
 * @Date: 2020-03-25 14:09:44
 * @LastEditTime: 2020-03-26 23:18:16
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
                res.send(JSON.stringify({
                    statusCode: 500,
                    message: '服务器错误'
                }));
            }
        })
    })

    app.post('/editJobInfo',(req,res)=>{
        let {jobId,...reset} = req.body.data;
        sqlFunc.editJobInfo([JSON.stringify(reset),jobId],(data)=>{
            if(data){
                res.send({
                    statusCode:200
                });
            }else{
                res.send(JSON.stringify({
                    statusCode: 500,
                    message: '服务器错误'
                }));
            }
        })
    })

    app.post('/getJobInfoByPage',(req,res)=>{ 
        let {nowPage,pageCount} = req.body.data;
        nowPage = (nowPage - 1) * pageCount;
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
        console.log(req.body)
        sqlFunc.getJobDataCount(req.body.data,(data)=>{
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

    app.post('/searchJobInfo',(req,res)=>{ 
        req.body.nowPage = (req.body.nowPage - 1) * req.body.pageCount;
        sqlFunc.searchJobInfo(req.body,(data)=>{
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