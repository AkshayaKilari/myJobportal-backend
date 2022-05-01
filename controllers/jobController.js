const asyncHandler = require('express-async-handler')

const Job = require('../models/jobModel')


const getJobs = asyncHandler( async (req,res) =>{

    const jobs = await Job.find({})
    res.status(200).json(jobs)
})

const postJob = asyncHandler( async (req,res) =>{

    const  {
        company,
        isNew,
        featured,
        position,
        role,
        level,
        postedAt,
        contract,
        location,
        languages,
        tools
      } = req.body;
    if(!company || !isNew || !featured || !position || !role || !level  || !postedAt || !contract || !location || !languages || !tools ){
        res.status(400)
        throw new Error("Please add all required fields")
    }
    const job = await Job.create({
        company,
        isNew,
        featured,
        position,
        role,
        level,
        postedAt,
        contract,
        location,
        languages,
        tools
      })

    if(job){
        res.status(201).json({
            message:'Job posted to database'
        })
    } else {
        res.status(400)
        throw new Error('Invalid Job data')
    }
})


module.exports = {
    getJobs,
    postJob
}