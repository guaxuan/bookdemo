var express = require('express');
var router = express.Router();
var userController = require("../controllers/user.js");
var positionController = require("../controllers/position.js");
var personController = require("../controllers/applicant");
var upload = require("../utils/upload");
// commcon Header
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/isLogin', userController.isLogin);
router.get('/logout', userController.logout);
// commcon position
router.post('/addposition',upload.single('logo'), positionController.addposition);
router.post('/updataPosition', upload.single('logo'),positionController.updataPosition);
router.get('/getpositionlist', positionController.getpositionlist);
router.get('/removePosition', positionController.removePosition);
router.get('/getPosition', positionController.getPosition);

router.post('/addpersoninfo',upload.single('logo'), personController.addperson);
// router.post('/updataPosition', upload.single('logo'),positionController.updataPosition);
router.get('/getpersonlist', personController.getpersonlist);
// router.get('/removePosition', positionController.removePosition);
router.get('/getPersonInfo', personController.getPersonInfo);
module.exports = router;
