let sqlFunc = require('../api/apiLoginRegister.js')
let fs = require('fs');
let url = require('url')
let sendEmail = require('../utils/sendEmail.js')

module.exports = (app, md5, upload, dirname) => {
    getMd5 = (password) => {
        return md5(md5(password))
    }
    judgePasswordLength = (password) => {
        if (password.length > 20) {
            return password
        } else {
            return getMd5(password)
        }
    }

    app.post('/login', (req, res) => {
        let queryCondition = req.body.username;
        let password = req.body.password;
        let status = req.body.status;
        sqlFunc.findUser(queryCondition, (data) => { 
            if (data.length > 0) {
                if (queryCondition == data[0].user_id && status == data[0].status && (getMd5(password) == judgePasswordLength(data[0].password))) {
                    req.session.username = queryCondition;
                    res.send(JSON.stringify({
                        statusCode: 200,
                        status: data[0].status,
                        username: data[0].username,
                        userid: data[0].user_id,
                        checkPass: true,
                        message: '登录成功',
                        cookie: req.sessionID,
                        avatar: data[0].avatar || ''
                    }));
                } else {
                    res.send(JSON.stringify({
                        statusCode: 200,
                        checkPass: false,
                        message: '信息输入有误，请您核对后重新登陆'
                    }))
                }

            } else {
                res.send(JSON.stringify({
                    statusCode: 200,
                    checkPass: false,
                    message: '账号不存在'
                }))
            }
        });


    })

    app.post('/register', upload.array('imgfile', 40), (req, res) => {
        let queryCondition = {
            username: req.body.username,
            password: md5(md5(req.body.password)),
            avatar: req.files[0] && req.files[0].filename ? req.files[0].filename : ''
        };

        let operationUser = new Promise((resolve, reject) => {
            sqlFunc.updateUser(queryCondition, (data) => {
                if (data && data.affectedRows != 0) {
                    resolve(res)
                } else {
                    reject(res)
                }
            });
        }).then((res) => {
            res.send(JSON.stringify({
                statusCode: 200,
                updated: true,
                message: '修改成功,请重新登录'
            }));
        }, (rej) => {
            rej.send(JSON.stringify({
                statusCode: 200,
                updated: false,
                message: '密码重复'
            }))
        }).then(() => {
            return new Promise((resolve, reject) => {//删除重复头像
                sqlFunc.findUser(queryCondition.username, (data) => {
                    if (data.length) {
                        let avatar = data[0].avatar;
                        if (avatar) {
                            fs.readdir('./uploads/', function (err, files) {
                                let filterFile = files.filter((ele) => {
                                    return ele.indexOf(queryCondition.username) == 0 && ele != avatar;

                                })
                                filterFile.forEach((ele) => {
                                    if (ele != '') {
                                        fs.unlink('./uploads/' + ele, (err) => {
                                            if (err) {
                                                console.log(err);
                                                res.send({
                                                    message: '服务器错误，头像上传失败'
                                                })
                                            } else {
                                                console.log('已经删除')
                                            }
                                        })
                                    }

                                })
                            });
                        }
                    }
                })
            })
        })






    })

    app.get('/getAvatar', function (req, res) {
        const username = url.parse(req.url, true).query.username;

        sqlFunc.findUser(username, (data) => {
            if (data.length) {
                let avatar = data[0].avatar;
                if (avatar) {
                    res.sendFile(dirname + '/uploads/' + avatar)
                }
            }
        })

    })

    app.post('/getUserAvatar', function (req, res) {
        const userid = req.body.userid;
        let host = req.headers.host
        console.log(req.body,'avatar')
        fs.readdir(`${dirname}/uploads/`,(err,files)=>{
           let res1 = files.filter((ele)=>{ 
                  return  userid && ele.indexOf(userid) == 0
            })
            if(res1.length){
                res.send(`http://${host}/${res1[0]}`)
            }else{
                res.send(``)
            }
        })
    })

    

    app.post('/applyCount', async (req, res) => {
        let queryCondition = {
            status: req.body.status,
            name: req.body.name,
            number: req.body.number,
            email: req.body.email
        };
        let isRegister;
        await sqlFunc.getAllUser([], (data) => {
            if (data) {
                for(let prop in data){
                    if(data[prop].user_id == queryCondition.number){
                        res.send({
                            statusCode: 200,
                            updated: false,
                            message: '申请失败，学号/学工号已被注册,请直接登录'
                        })
                        return false;
                    }
                }
                sqlFunc.applyCount(queryCondition, (data) => {
                    if (!data.errno) {
                        res.send(JSON.stringify({
                            statusCode: 200,
                            updated: true,
                            message: '申请成功，请等待管理员审核'
                        }));
                    } else {
                        res.send(JSON.stringify({
                            statusCode: 200,
                            updated: false,
                            message: data.errno == 1062 ? '申请失败，学号/学工号已被注册,请直接登录' : '申请失败，服务器失联'
                        }))
                    }
                });
            } else {
                res.send(JSON.stringify({
                    statusCode: 500,
                    updated: false,
                    message: '申请失败，服务器失联'
                }))
            }
        });
       
    })

    app.post('/getapplyCount', (req, res) => {
        sqlFunc.getapplyCount([], (data) => {
            if (data) {
                res.send({
                    status: 200,
                    data
                })
            } else {
                res.send({
                    status: 500,
                    message: '服务器报错'
                })
            }
        });
    })

    app.post('/getAllUser', (req, res) => {
        sqlFunc.getAllUser([], (data) => {
            if (data) {
                res.send({
                    status: 200,
                    data
                })
            } else {
                res.send({
                    status: 500,
                    message: '服务器报错'
                })
            }
        });
    })

    app.post('/addUserApply', (req, res) => {
        let queryCondition = {
            ...req.body
        };
        let account;
        if (req.body.status == '学生') {
            account = '学号'
        } else if (req.body.status = '老师') {
            account = '职工号'
        } else {
            account = '电话'
        }
        sqlFunc.addUserApply(queryCondition, (data) => {
           
            if (data) {
                sqlFunc.delapplyCount(req.body.number, () => {});
                sendEmail(req.body.email, `${req.body.name},你好！国际学院毕业生就业信息管理系统的账户和密码已经重置为您的${account},登陆后请及时修改密码`)
                res.send({
                    status: 200,
                })
            } else {
                res.send({
                    status: 500,
                    message: '服务器报错'
                })
            }
        });
    })

    app.post('/delUserApply', (req, res) => {
        let queryCondition = {
            ...req.body
        };
        sqlFunc.delapplyCount(req.body.number, (data) => {
            if (data) {
                res.send({
                    status: 200,
                })
            } else {
                res.send({
                    status: 500,
                    message: '服务器报错'
                })
            }
        })
    })



    app.post('/judgeLogin', (req, res) => {
        let queryCondition = req.body.session;
        sqlFunc.judgeLogin(queryCondition, (data) => {
            if (data.length) {
                res.send(true);
            } else {
                res.send(false)
            }
        });


    })

    app.post('/signOutLogin', (req, res) => {
        let queryCondition = req.body.session;
        sqlFunc.signOutLogin(queryCondition, (data) => {
            if (data) {
                res.send({
                    status: 200,
                    result: true,
                    message: '退出成功'
                });
            } else {
                res.send({
                    status: 200,
                    result: false,
                    message: '退出成功'
                })
            }
        });


    })

}