let sqlFunc = require('../api/apiCompany.js')
let fs = require('fs');
let url = require('url')

let judgeDirExist = ()=>{
    fs.readdir( './companyImg',function(err,files){
        if(!err){
            return files
        }
    });
}
let makeDir = (url1)=>{
    fs.mkdir(`./companyImg/${url1}`,function(error){
        if(error){
            return false;
        }
        console.log('创建目录成功');
    })
}
let multer = require("multer");
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let url1 = url.parse(req.url, true).query.username;
        judgeDirExist(url1) ? makeDir(url1) : '';
        cb(null, `./companyImg/${url1}`);
    },
    filename: function(req, file, cb) {
       let url1 = url.parse(req.url, true).query.username
        
        cb(null, `${url1}-${file.originalname}`)
    }
})
let upload = multer({ storage: storage });

module.exports = (app) => {
    app.post('/addCompanyInfo',(req,res)=>{
        let params = req.body;
        sqlFunc.addCompanyInfo(JSON.stringify(params),(data)=>{
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

    app.post('/editCompanyInfo',(req,res)=>{
        let params = req.body;
        sqlFunc.editCompanyInfo(JSON.stringify(params),(data)=>{
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

    app.post('/getCompanyInfo',(req,res)=>{
        let params = req.body.userid;
        sqlFunc.getCompanyInfo(params,(data)=>{
            if(data.length){
                res.send(JSON.stringify({
                    statusCode: 200,
                    data:data
                }));
            }else{
                res.send(JSON.stringify({
                    statusCode: 500,
                    message: '服务器错误'
                }));
            }
        })
    })

    app.post('/addCompanyDevelop',(req,res)=>{
        let params = req.body;
        sqlFunc.addCompanyDevelop(JSON.stringify(params),(data)=>{
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
    /**
     * @description: 保存图片函数
     * @param {type} 
     * @return: 
     */
    app.post('/sendCompanyImg', upload.array('imgfile', 40),async (req, res) => {
        let fileArr;
        let userid = url.parse(req.url, true).query.username
        if(req.files || req.files.length > 0){
            fileArr = req.files.map((ele)=>{
                return ele.filename
            })
        }
        console.log(fileArr,'woshishui')
        await fs.readdir('./companyImg/' + userid, function (err, files) {
            let filterFile=new Set(files.filter(x=>!fileArr.includes(x)));//取差集，删除操作
            filterFile = [...filterFile]
            filterFile.forEach((ele) => {
                if(ele!=''){
                    fs.unlink(`./companyImg/${userid}/`+ ele, (err) => {
                        if (err) {
                            console.log(err);
                             
                        } else {
                            console.log('已经删除')
                        }
                    })
                }
                
            })
        })
        let distImgFiles;
        fs.readdir('./companyImg/' + userid,function(err, files){//更新图片目录后再次读取文件名，存入数据库。
            if(!err){
                distImgFiles=files;
                sqlFunc.saveImgFileName([distImgFiles,userid],function(data){
                    console.log(data);
                    if(data.affectedRows){
                        res.send({
                            message:'保存成功'
                        })
                    }else{
                        res.send({
                            message:'保存失败'
                        })
                    }
                })//保存图片文件到数据库
            }
        })
        

    })

    app.post('/getCompanyImg',(req,res)=>{
        let userid = url.parse(req.url, true).query.userid;
        let host = req.headers.host
        let imgArr = [];
        fs.readdir('./companyImg/' + userid,function(err, files){//更新图片目录后再次读取文件名，存入数据库。
            if(!err){ 
                imgArr = files.map((ele)=>{
                    return `http://${host}/${userid}/${ele}`
                })
                res.send(JSON.stringify(imgArr))
            }
        })
    })
}