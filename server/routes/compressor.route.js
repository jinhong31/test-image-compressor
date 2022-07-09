const express = require('express');
const router = express.Router();
const multer = require('multer');
const compressorController = require("../controller/compressor.controller");
const paginatedResults = require("../middleware/pagination.middleware")
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post('/upload', upload.single("file"), compressorController.upload);
router.get('/', compressorController.index);
router.get('/pagination', paginatedResults, compressorController.pagination);
router.get("/show", compressorController.show)
module.exports = router;


