const mongoose = require('mongoose')

const jobSchema = mongoose.Schema({
    company:{
        type:String,
    },
    isNew:{
        type:Boolean,
    },
    featured:{
        type:Boolean,
    },
    position:{
        type:String,
    },
    role:{
        type:String,
    },
    level:{
        type:String,
    },
    postedAt:{
        type:String,
    },
    contract:{
        type:String,
    },
    location:{
        type:String,
    },
    languages:{
        type:[String],
    },
    tools:{
        type:[String],
    },
},{
    timestamps:true,
})


module.exports = mongoose.model('Jobs',jobSchema)