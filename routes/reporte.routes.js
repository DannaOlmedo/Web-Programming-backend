const express = require("express");
const router = express.Router();
const reporteController = require("../controllers/reporte.controller");

router.get("/", reporteController.obtenerReportes);
router.post("/", reporteController.crearReporte);

module.exports = router;
