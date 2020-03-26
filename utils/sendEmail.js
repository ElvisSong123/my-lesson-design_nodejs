/*
 * @Author: your name
 * @Date: 2020-03-26 20:06:07
 * @LastEditTime: 2020-03-26 20:46:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \毕业设计\server\utils\sendEmail.js
 */
let nodemailer = require('nodemailer');
console.log('hello')
let transporter = nodemailer.createTransport({
    service: 'qq',
    port: 465, // SMTP 端口
    secureConnection: true, // 使用了 SSL
    auth: {
     user: '2889250797@qq.com',
     pass: 'euwxnhkivuhodfch',
    }
});

let sendEmail = (email,text)=>{
    console.log(email,text)
    let mailOptions= {
        from: '"test" <2889250797@qq.com>', // 你到qq邮箱地址
        to: email, // 接受人,可以群发填写多个逗号分隔
        subject: '账号申请成功', // 主题名(邮件名)
        // 可以发送text或者html格式,2选1
        // text: 'Hello world?', // 纯文本
        html: `<b>${text}</b>` // html
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
         return console.log(error);
        }
        console.log('邮件已发送成功,邮件id: %s', info.messageId);
    });           
}
module.exports = sendEmail
