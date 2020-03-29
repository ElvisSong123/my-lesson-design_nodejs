/*
 * @Author: your name
 * @Date: 2020-03-28 17:42:08
 * @LastEditTime: 2020-03-29 13:51:07
 * @LastEditors: Please set LastEditors
 * @Description: 学院公告
 * @FilePath: \毕业设计\server\router\announceRouter.js
 */

let sqlFunc = require('../api/apiAnnounce.js')
let fs = require('fs');
let url = require('url')

module.exports = (app) => {

    app.post('/deliverAnnounce',(req,res)=>{
        let params = req.body; 
        console.log(params)
        sqlFunc.deliverAnnounce(params,(data)=>{
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

    app.post('/getAnnounceInfo',(req,res)=>{ 
        sqlFunc.getAnnounceInfo(req.body,(data)=>{
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

    app.post('/getMyDelivetAnnounce',(req,res)=>{ 
        sqlFunc.getMyDelivetAnnounce(req.body.userid,(data)=>{
            if(data.length){
                res.send(JSON.stringify({
                    statusCode:200,
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
    
    app.post('/delAnnounce',(req,res)=>{ 
        sqlFunc.delAnnounce(req.body.id,(data)=>{
            if(data){
                res.send(JSON.stringify({
                    statusCode:200,
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