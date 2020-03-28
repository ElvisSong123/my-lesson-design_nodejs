/*
 * @Author: your name
 * @Date: 2020-03-22 11:41:27
 * @LastEditTime: 2020-03-28 17:47:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \毕业设计\server\router\index.js
 */
let loginRouter = require('./loginRouter.js');
let resumeRouter = require('./resumeRouter.js');
let companyRouter = require('./companyRouter.js');
let jobRouter = require('./jobRouter.js');
let deliverResumeRouter = require('./deliverResumeRouter');
let entryJobRouter = require('./entryJobRouter');
let announceRouter = require('./announceRouter')

module.exports = (app, md5, upload,dirname)=>{
    loginRouter(app, md5, upload,dirname);
    resumeRouter(app, md5, upload);
    companyRouter(app);
    jobRouter(app);
    deliverResumeRouter(app);
    entryJobRouter(app);
    announceRouter(app)
}