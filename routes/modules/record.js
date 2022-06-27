const express = require('express')
const router = express.Router()
const recordController = require('../../controllers/record-controller')

router.get('/create', recordController.getCreatePage)
router.post('/', recordController.postRecords)
router.get('/:id/edit', recordController.getEditPage)
router.put('/:id', recordController.putRecords)
router.delete('/:id', recordController.deleteRecords)

module.exports = router
