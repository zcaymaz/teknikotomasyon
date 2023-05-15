const router = require('express').Router();
const ServiceCtrl = require('../controllers/serviceCtrl');

router.route('/service')
    .get(ServiceCtrl.getAllService)
    .post(ServiceCtrl.createService)

router.route('/service/:id')
    .get(ServiceCtrl.getServiceById)

router.route('/service/email')
    .post(ServiceCtrl.getServicesUser)

module.exports = router