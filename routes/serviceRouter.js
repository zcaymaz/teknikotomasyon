const router = require('express').Router();
const ServiceCtrl = require('../controllers/serviceCtrl');

router.route('/service')
    .get(ServiceCtrl.getAllService)
    .post(ServiceCtrl.createService);

router.route('/service/:id')
    .get(ServiceCtrl.getServiceById)
    .put(ServiceCtrl.updateServiceData);

router.route('/service/:id/archive')
    .put(ServiceCtrl.updateService)

router.route('/service/name')
    .post(ServiceCtrl.getServicesUser);

module.exports = router;
