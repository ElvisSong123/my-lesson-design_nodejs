/*
 * @Author: your name
 * @Date: 2020-03-27 13:15:14
 * @LastEditTime: 2020-03-27 14:10:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \毕业设计\server\router\deliverResumeRouter.js
 */
let sqlFunc = require('../api/apiDeliverResume.js')
let fs = require('fs');
let url = require('url')

module.exports = (app) => {

    app.post('/addDeliverResume',(req,res)=>{ 
        const {corp_id,job_id,job_address,job_name,userid,resumeData} = req.body;
        sqlFunc.addDeliverResume([corp_id,job_id,job_address,job_name,userid,JSON.stringify(resumeData)],(data)=>{
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

    app.post('/getDeliverResume',(req,res)=>{ 
        const userid = req.body.userid;
        sqlFunc.getDeliverResume(userid,(data)=>{
            if(data){
                res.send(JSON.stringify({
                    statusCode: 200,
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

}