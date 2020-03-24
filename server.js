/*
 * @Author: your name
 * @Date: 2020-03-22 11:41:27
 * @LastEditTime: 2020-03-24 21:35:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \毕业设计\server\server.js
 */
let express = require('express');
let app = express();
const cors = require('cors');
const bodyParser = require('body-parser');//获取post请求参数插件
const router = require('./router/index.js');
const mysql = require('./api/index.js');
const session=require("express-session");
const MySQLStore=require('express-mysql-session')(session);
const md5 = require('blueimp-md5')
let url = require('url')

let multer = require("multer");
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let url1 = url.parse(req.url, true).query.username;
        console.log(url1,'user')
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
       let url1 = url.parse(req.url, true).query.username
        
        cb(null, `${url1}-${file.originalname}`)
    }
})
let upload = multer({ storage: storage });
app.use(express.static('dist'));
app.use(express.static('uploads'));
app.use(express.static('companyImg'))

const sqlConnect = mysql();
let sessionStore = new MySQLStore({
    expiration: 10800000,
    createDatabaseTable: true,  //是否创建表
    schema: {
        tableName: 'session_tab',   //表名
        columnNames: {      //列选项
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}, sqlConnect);

app.use(session({
    key: 'connect-sid',
    secret: "keyboard",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: ('name', 'value',{  maxAge:  6*60*60*1000,
                                secure: false,
                                name: "seName",
                                resave: false})
}));

app.use(bodyParser.json());//数据JSON类型
app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据
app.use(cors()); //cors解决跨域


router(app,md5,upload,__dirname)

app.listen('12306', () => {
    console.log('服务器经启动')
})