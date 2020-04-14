const mongoose = require('mongoose');
const schema = mongoose.Schema;
const webInfo = new schema({
    nameWeb: {
        type: String,
        required: true
    },
    pathUrl: {
        type: String,
        required: true
    },
    lastPage : {
        type:Number,
        required:false,
        default : 1
    },
    timeCrawler : {
        type : String ,
        required: false
    }
})
module.exports = mongoose.model('webinfo', webInfo);
