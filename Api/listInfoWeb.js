const express=require('express');
const router = express.Router();
const axios  = require('axios');
const cheerio = require('cheerio');
var webInfo = require('../Model/web-info');
var companyInfo = require('../Model/company-info');
var checkToken = require('./checkToken');
var auth=checkToken.checkToken;
router.post('/',auth,(req,res)=>{
    console.log(req.body);
    
    const newWebInfo = new webInfo(
        req.body 
    )
    newWebInfo
        .save()
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            res.send({success : false , message : err})
        });
})

router.get('/',auth,(req,res)=>{
    webInfo.find({}).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send({success : 'false',message : err})
    });
})
router.post('/move',auth,(req,res)=>{
    let {idWeb} = req.body
    webInfo.find({}).then((data) => {
        for(let i = 0 ;i<data.length ;i++){
            if(data[i]._id == idWeb){
                let a = data[i];
               data.splice(i,1)
               data.push(a)
               res.send(data)
            }
        }
    }).catch((err) => {
        console.log(err);
        
    });
})
router.post('/crawlerWeb',auth,(req,res)=>{
    let dataNameWeb = req.body.webinfoUrl;
    (async()=>{
        await axios.get(dataNameWeb).then((result) => {
            $=cheerio.load(result.data) ;
            let path= $('.Details-info-web .title-section').text();
            res.send(path.trim()) ;
        }).catch((err)=> {
            res.send({success:false , message:err})
        });
    })()
})
router.post('/findId',auth,(req,res)=>{
    let {id}=req.body
    console.log(id);
    webInfo.find({_id:id}).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send({success : 'false',message : err})
    });
})
router.put('/',auth,(req,res)=>{
    webInfo.findOneAndUpdate({_id : req.body._id} , req.body).then((data) => {
        res.send({success:true})
    }).catch((err) => {
        res.send({success : 'false' , message : err})
    });
})
router.delete('/',auth,(req,res)=>{
    let arrNameWeb = req.body.deleteNameWeb ; 
    console.log(arrNameWeb);
    for(let i=0;i<arrNameWeb.length;i++){
        console.log(i);
        (async()=>{ 
            try{
                let  deleteCompanyInfo = await companyInfo.deleteMany({webInfoId:arrNameWeb[i]}) ;
                let deleteWebInfo  = await webInfo.deleteOne({_id:arrNameWeb[i]});
                if(i==arrNameWeb.length-1){
                    console.log("cong dep tri");
                     return   res.send({success:true})
                }
            }catch(err){
                res.send({success : 'false' , message : err})
            }
        })()
    }
})
module.exports = router ; 
