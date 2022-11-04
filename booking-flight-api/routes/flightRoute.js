const express = require('express');
const flightController = require('../controllers/flightController');

const router = express.Router();



router.post('/', flightController.addFlight)
router.put('/:id', flightController.updateFlight)
router.get('/', flightController.getFlight)
router.get('/:id', flightController.getAFlight)
router.delete('/:id', flightController.deleteFlight)

module.exports = router;