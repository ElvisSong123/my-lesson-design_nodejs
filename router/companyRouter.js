let sqlFunc = require('../api/apiCompany.js')
let fs = require('fs');
let url = require('url')

/**
 * @description: 判断目录是否存在
 * @param {type} 
 * @return: 
 */
let isExist = true;
let judgeDirExist = (url)=>{
    fs.readdirSync( './companyImg',function(err,files){
        if(!err){
            console.log(files,url)
            if(!files.includes(url)){
                isExist = false;
            }
        }
    });
}
/**
 * @description: 创建目录
 * @param {type} 
 * @return: 
 */
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
        judgeDirExist(url1)
        makeDir(url1);//不存在则创建目录
        cb(null, `./companyImg/${url1}`);
    },
    filename: function(req, file, cb) {
       let url1 = url.parse(req.url, true).query.username
       let avatar = url.parse(req.url, true).query.avatar;
       avatar ? cb(null, `${avatar}-${url1}-${file.originalname}`) : cb(null, `${url1}-${file.originalname}`);
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
        let userid = url.parse(req.url, true).query.username;
        let host = req.headers.host
        if(req.files || req.files.length > 0){
            fileArr = req.files.map((ele)=>{
                return ele.filename
            })
        }
        console.log(fileArr,'woshishui')
        console.log(123);
        if(fileArr.length == 1 && fileArr[0].indexOf('avatar') == 0){//上传企业头像的情况
            await fs.readdir('./companyImg/' + userid, function (err, files) {
                if(files){
                    let filterFile=files.filter(x=>x.includes('avatar-')&&!x.includes(fileArr[0]));//取差集，删除操作
                    console.log(filterFile,'xixixixi')
                    if(filterFile.length!=0){
                            fs.unlink(`./companyImg/${userid}/`+ filterFile[0], (err) => {
                                if (err) {
                                    console.log(err);                      
                                } else {
                                    console.log('已经删除');           
                                }
                            })
                        }               
                    }
               
            })
        }else{
            await fs.readdir('./companyImg/' + userid, function (err, files) {//上传企业文化照片
                if(files){
                    let filterFile=new Set(files.filter(x=>!fileArr.includes(x)&&x.indexOf('avatar')==-1));//取差集，删除操作
                    filterFile = [...filterFile]
                    filterFile.forEach((ele,index) => {
                        if(ele!=''){
                            fs.unlink(`./companyImg/${userid}/`+ ele, (err) => {
                                if (err) {
                                    console.log(err);                      
                                } else {
                                    console.log('已经删除');
                                     
                                }
                            })
                        }
                        
                    })
                }
               
            })
        }
        
        res.send({
            message:'保存成功'
        })

    })

    /**
     * @description: 获取企业文化图片
     * @param {type} 
     * @return: 
     */
    app.post('/getCompanyImg',(req,res)=>{
        let userid = url.parse(req.url, true).query.userid;
        let host = req.headers.host
        let imgArr = [];
        fs.readdir('./companyImg/' + userid,function(err, files){
            if(!err){ 
                imgArr = files.map((ele)=>{
                    return `http://${host}/${userid}/${ele}`
                })
                res.send(JSON.stringify(imgArr))
            }
        })
    })


}