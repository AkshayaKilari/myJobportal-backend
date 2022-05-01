const express = require('express')
const router = express.Router()

const { getJobs, postJob} = require('../controllers/jobController')

const {protect} = require('../middlewares/auth')

router.get('/', protect, getJobs)
router.post('/', protect, postJob)



module.exports = router