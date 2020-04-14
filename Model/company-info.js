const mongoose = require('mongoose');
const schema = mongoose.Schema;
const companyInfo = new schema({
    nameCity:{
        type:String,
        required:false
    },
    nameApp:{
        type:String,
        required:false
    },
    nameCompany: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    telePhone: {
        type: String,
        required : false
    },
    taxCode : {
        type : String,
        required : false
    },
    city : {
        type : String,
        required : false 
    },
    domainName :{
        type : String,
        required : false
    },
    subdomainName :{
        type : String,
        required : false
    },
    webInfoId : {
        type : String , 
        required: true , 
    }
    
})
module.exports = mongoose.model('companyInfo', companyInfo);