/*
 * @Author: your name
 * @Date: 2020-03-28 11:35:35
 * @LastEditTime: 2020-03-28 20:53:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \毕业设计\server\router\entryJobRouter.js
 */
/*
 * @Author: your name
 * @Date: 2020-03-27 13:15:14
 * @LastEditTime: 2020-03-28 11:11:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \毕业设计\server\router\deliverResumeRouter.js
 */
let func1 = require('../api/apiEntryJob');
let func2 = require('../api/apiLoginRegister');
let sqlFunc = {
    ...func1,
    ...func2
}
let fs = require('fs');

module.exports = (app) => {

    app.post('/confirmEnetryJob', (req, res) => {
        const {
            deliver_jobname,
            company_name,
            company_id = '',
            userid,
            job_id = '',
            sex,
            major
        } = req.body;
        console.log(req.body)
        sqlFunc.findUser(req.body.userid, (data) => { 
            let username = data[0].username;
            let email = data[0].email;
            sqlFunc.confirmEnetryJob([username, userid, email, company_id, company_name, deliver_jobname,job_id,sex,major], (data) => {
           
                if (data.affectedRows) {
                    res.send(JSON.stringify({
                        statusCode: 200,
                        message: '保存成功'
                    }));
                } else {
                    res.send(JSON.stringify({
                        statusCode: 500,
                        message: '服务器错误'
                    }));
                }
            })
        })

    })

    app.post('/getEnetryJob', (req, res) => {
        sqlFunc.getEnetryJob(req.body.userid, (data) => {
            if (data.length) {
                res.send(JSON.stringify({
                    statusCode: 200,
                    data
                }));
            } else {
                res.send(JSON.stringify({
                    statusCode: 500,
                    message: '服务器错误'
                }));
            }
        })


    })

    app.post('/getEnetryJobByCompanyId', (req, res) => {
        sqlFunc.getEnetryJobByCompanyId(req.body.userid, (data) => {
            if (data.length) {
                res.send(JSON.stringify({
                    statusCode: 200,
                    data
                }));
            } else {
                res.send(JSON.stringify({
                    statusCode: 500,
                    message: '服务器错误'
                }));
            }
        })
    })

    app.post('/updateEntryJob', (req, res) => {
        sqlFunc.updateEntryJob(req.body, (data) => {
            if (data) {
                res.send(JSON.stringify({
                    statusCode: 200,
                    data
                }));
            } else {
                res.send(JSON.stringify({
                    statusCode: 500,
                    message: '服务器错误'
                }));
            }
        })
    })

    app.post('/delEnetryJob', (req, res) => {
        sqlFunc.delEntryJob(req.body.userid, (data) => {
            if (data) {
                res.send(JSON.stringify({
                    statusCode: 200,
                }));
            } else {
                res.send(JSON.stringify({
                    statusCode: 500,
                    message: '服务器错误'
                }));
            }
        })
    })


}