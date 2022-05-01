const mongoose = require('mongoose')

const companySchema = mongoose.Schema({
    full_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    industry_type:{
        type:String,
        required:true        
    },
    about:{
        type:String,
        required:true        
    },
    jobs:{
        type:[String],
    },
},{
    timestamps:true,
})


module.exports = mongoose.model('Company_Model',companySchema)