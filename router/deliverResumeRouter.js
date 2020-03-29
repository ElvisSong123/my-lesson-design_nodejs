/*
 * @Author: your name
 * @Date: 2020-03-27 13:15:14
 * @LastEditTime: 2020-03-29 14:51:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \毕业设计\server\router\deliverResumeRouter.js
 */
let sqlFunc = require('../api/apiDeliverResume.js');
let loginFunc = require('../api/apiLoginRegister.js');
let sendEmail = require('../utils/sendEmail.js')
let fs = require('fs');
let url = require('url')

let sendEmailByState = (state,app,userid,moveCompanyName,moveJobName)=>{
    loginFunc.findUser(userid,(data)=>{ 
        const {email,username} = data[0];
        if(state == '初选通过'){
            sendEmail('初选通过',email, `${username},你好！恭喜您！您投递的${moveCompanyName}-${moveJobName}简历已通过筛选，请留意近期笔试/面试通知`)
        }else if(state == '初试通过'){
            sendEmail('初试通过',email, `${username},你好！恭喜您！您已通过${moveCompanyName}-${moveJobName}初试，请留意近期复试通知`)
        }else if(state == '复试通过'){
            sendEmail('复试通过',email, `${username},你好！恭喜您！您已通过${moveCompanyName}-${moveJobName}复试，近期会有HR跟您沟通，请您留意`)
        }else if(state == '发放offer'){
            sendEmail('发放offer',email, `${username},你好！恭喜您！您已被本公司录用，投递的职位是${moveCompanyName}公司-${moveJobName}，offer近期会发放，请您查收`)

        }else if(state == '进入人才库'){
            sendEmail('进入人才库',email, `${username},你好！很抱歉！您的表现还未满足公司的所有要求，你的数据信息已经存入公司的人才库，期待以后合作！`)
        }
    })
}

module.exports = (app) => {

    app.post('/addDeliverResume',(req,res)=>{ 
        const {corp_id,job_id,job_address,job_name,userid,resumeData,deliverState,company_name} = req.body;
        sqlFunc.addDeliverResume([corp_id,job_id,job_address,job_name,company_name,userid,JSON.stringify(resumeData),deliverState],(data)=>{
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

    app.post('/searchCandidateInfo',(req,res)=>{
        req.body.nowPage = (req.body.nowPage - 1) * req.body.pageCount;
        sqlFunc.searchCandidateInfo(req.body,(data)=>{
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

    app.post('/searchCandidateCount',(req,res)=>{
        sqlFunc.searchCandidateCount(req.body,(data)=>{
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

    app.post('/changeCandidateState',(req,res)=>{
        let state = req.body.state;
        let userid = req.body.userId;
        let moveCompanyName = req.body.moveCompanyName;
        let moveJobName = req.body.moveJobName;
        console.log(moveJobName,'hahaha')
        sqlFunc.changeCandidateState(req.body,(data)=>{
            if(data){
                sendEmailByState(state,app,userid,moveCompanyName,moveJobName);
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

    
    app.post('/getDeliverFeedback',(req,res)=>{
        sqlFunc.getDeliverFeedback(req.body.userid,(data)=>{
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