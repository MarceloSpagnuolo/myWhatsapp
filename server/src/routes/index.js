const { Router } = require('express')
const router = Router()

const wsRouter = require('./ws')

router.use('/ws', wsRouter)

module.exports = router
