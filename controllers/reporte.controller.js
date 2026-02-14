const Reporte = require("../models/reporte.model");

// Obtener todos los reportes
exports.obtenerReportes = async (req, res) => {
  try {
    const reportes = await Reporte.find().sort({ fecha: -1 });
    res.json(reportes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener reportes" });
  }
};

// Crear nuevo reporte
exports.crearReporte = async (req, res) => {
  try {
    const nuevo = new Reporte(req.body);
    await nuevo.save();

    req.io.emit("nuevo_reporte", nuevo);

    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: "Error al crear reporte" });
  }
};
